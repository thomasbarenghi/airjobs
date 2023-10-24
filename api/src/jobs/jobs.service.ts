import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  findJob,
  verifyHasApplied,
  verifyHasCompany,
  verifyIsAspirant,
  verifyIsCompany,
  verifyIsOwner,
} from './utils';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { ApplyJobDto } from './dto/apply-job.dto';
import { findUser, removeJobFromUser } from 'src/users/utils';
import { validateUrl } from 'src/utils/validate-url.utils';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const user = await findUser(createJobDto.ownerId, this.userModel);
    verifyIsCompany(user);
    verifyHasCompany(user);
    const job = await new this.jobModel(createJobDto);
    job.owner = user._id;
    await job.save();
    user.jobs.created.push(job._id);
    user.markModified('jobs');
    await user.save();
    return job;
  }

  async findAll(country: string, title: string) {
    return await this.jobModel
      .find({
        ...(country && { country }),
        ...(title && { title: { $regex: title, $options: 'i' } }),
      })
      .populate({
        path: 'owner',
        model: 'User',
      });
  }

  async findOne(id: string) {
    return await findJob(id, this.jobModel);
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const job = await findJob(id, this.jobModel);
    const user = await findUser(updateJobDto.ownerId, this.userModel);
    verifyIsCompany(user);
    verifyIsOwner(user, job);
    delete updateJobDto.ownerId;
    job.set(updateJobDto);
    await job.save();
    return job;
  }

  async remove(id: string) {
    const job = await findJob(id, this.jobModel);
    await removeJobFromUser(job.owner._id.toString(), id, this.userModel);

    for (const applicant of job.applicants) {
      await removeJobFromUser(
        applicant.user._id.toString(),
        id,
        this.userModel,
      );
    }

    return await this.jobModel.findByIdAndDelete(id);
  }

  async apply(id: string, applyJobDto: ApplyJobDto) {
    await validateUrl(applyJobDto.resume);
    const user = await findUser(applyJobDto.userId, this.userModel);
    await verifyIsAspirant(user);
    const job = await findJob(id, this.jobModel);

    if (job.maxApplicants === job.applicants.length)
      throw new ConflictException('Job is full');

    const hasApplied = await verifyHasApplied(user, job, false);
    if (hasApplied) throw new ConflictException('User has already applied');

    job.applicants.push({
      user: user._id,
      status: 'Under review',
      resume: applyJobDto.resume,
      createdAt: new Date(),
    });

    await job.save();
    user.jobs.applied.push(job._id);
    user.markModified('jobs');
    await user.save();
    return job;
  }

  async unapply(id: string, userId: string) {
    const user = await findUser(userId, this.userModel);
    await verifyIsAspirant(user);
    const job = await findJob(id, this.jobModel);
    verifyHasApplied(user, job, true);
    await removeJobFromUser(userId, id, this.userModel);

    job.applicants = job.applicants.filter(
      (applicant) => applicant.user._id.toString() !== userId,
    );
    console.log(job.applicants);
    job.markModified('applicants');
    await job.save();
    return job;
  }

  async updateApplicant(id: string, updateApplicantDto: UpdateApplicantDto) {
    const { userId, status } = updateApplicantDto;
    const user = await findUser(userId, this.userModel);
    verifyIsAspirant(user);
    const job = await findJob(id, this.jobModel);
    verifyHasApplied(user, job, true);

    const applicant = job.applicants.find(
      (applicant) => applicant.user._id.toString() === userId,
    );
    if (!applicant) throw new NotFoundException('Applicant not found');
    applicant.status = status;
    job.markModified('applicants');
    await job.save();
    return job;
  }
}
