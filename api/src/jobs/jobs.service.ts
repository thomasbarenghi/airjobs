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

  async findAll(country: string) {
    return await this.jobModel
      .find({
        ...(country && { country }),
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
    await removeJobFromUser(job.owner.toString(), id, this.userModel);

    for (const applicant of job.applicants) {
      await removeJobFromUser(applicant.user.toString(), id, this.userModel);
    }

    return await this.jobModel.findByIdAndDelete(id);
  }

  async apply(id: string, applyJobDto: ApplyJobDto) {
    const user = await findUser(applyJobDto.userId, this.userModel);
    await verifyIsAspirant(user);
    const job = await findJob(id, this.jobModel);

    if (job.maxApplicants === job.applicants.length)
      throw new ConflictException('Job is full');

    await verifyHasApplied(user, job);

    job.applicants.push({
      user: user._id,
      status: 'Under review',
      resume: applyJobDto.resume,
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
    await verifyHasApplied(user, job);
    await removeJobFromUser(userId, id, this.userModel);

    job.applicants = job.applicants.filter(
      (applicant) => applicant.user.toString() !== userId,
    );

    return await job.save();
  }

  async updateApplicant(id: string, updateApplicantDto: UpdateApplicantDto) {
    const { userId, status } = updateApplicantDto;
    const user = await findUser(userId, this.userModel);
    verifyIsCompany(user);
    const job = await findJob(id, this.jobModel);
    verifyHasApplied(user, job);

    const applicant = job.applicants.find(
      (applicant) => applicant.user.toString() === userId,
    );
    if (!applicant) throw new NotFoundException('Applicant not found');
    applicant.status = status;

    return await job.save();
  }
}
