import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { ApplyJobDto } from './dto/apply-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  private async findUser(id: string) {
    const user = await this.userModel.findById(id).catch((error) => {
      console.error(error);
      throw new BadRequestException();
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async create(createJobDto: CreateJobDto) {
    const user = await this.findUser(createJobDto.ownerId);
    if (user.role !== 'company')
      throw new ConflictException('User is not a company');

    if (user.company === null)
      throw new ConflictException('User has no company');

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
    return await this.jobModel.findById(id).populate([
      {
        path: 'owner',
        model: 'User',
      },
      { path: 'applicants.user', model: 'User' },
    ]);
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.jobModel.findById(id);
    if (!job) throw new NotFoundException('Job not found');
    const user = await this.findUser(updateJobDto.ownerId);

    if (user.role !== 'company')
      throw new ConflictException('User is not a company');

    if (user._id.toString() !== job.owner.toString())
      throw new ConflictException('User is not the owner of the job');
    delete updateJobDto.ownerId;
    job.set(updateJobDto);
    await job.save();
    return job;
  }

  async remove(id: string) {
    const job = await this.jobModel.findById(id);
    if (!job) throw new NotFoundException('Job not found');
    const user = await this.findUser(job.owner.toString());
    user.jobs.created = user.jobs.created.filter(
      (job) => job.toString() !== id,
    );
    user.markModified('jobs');
    await user.save();

    for (const applicant of job.applicants) {
      const user = await this.findUser(applicant.user.toString());
      user.jobs.applied = user.jobs.applied.filter(
        (job) => job.toString() !== id,
      );
      user.markModified('jobs');
      await user.save();
    }

    return await this.jobModel.findByIdAndDelete(id);
  }

  async apply(id: string, applyJobDto: ApplyJobDto) {
    const user = await this.findUser(applyJobDto.userId);
    if (user.role !== 'aspirant')
      throw new ConflictException('User is not an aspirant');

    const job = await this.jobModel.findById(id);

    if (!job) throw new NotFoundException('Job not found');

    if (
      job.applicants.find((applicant) => applicant.user.toString() === applyJobDto.userId)
    )
      throw new ConflictException('User already applied');

    if (job.maxApplicants === job.applicants.length)
      throw new ConflictException('Job is full');

    job.applicants.push({ user: user._id, status: 'Under review', resume: applyJobDto.resume });

    await job.save();

    user.jobs.applied.push(job._id);
    user.markModified('jobs');

    await user.save();

    return job;
  }

  async unapply(id: string, userId: string) {
    const user = await this.findUser(userId);
    if (user.role !== 'aspirant')
      throw new ConflictException('User is not an aspirant');

    const job = await this.jobModel.findById(id);

    if (!job) throw new NotFoundException('Job not found');

    if (
      !job.applicants.find((applicant) => applicant.user.toString() === userId)
    )
      throw new ConflictException('User did not apply');

    job.applicants = job.applicants.filter(
      (applicant) => applicant.user.toString() !== userId,
    );

    await job.save();

    user.jobs.applied = user.jobs.applied.filter(
      (job) => job.toString() !== id,
    );
    user.markModified('jobs');

    await user.save();

    return job;
  }

  async updateApplicant(id: string, updateApplicantDto: UpdateApplicantDto) {
    const { userId, status } = updateApplicantDto;
    const user = await this.findUser(userId);
    if (user.role !== 'company')
      throw new ConflictException('User is not a company');

    const job = await this.jobModel.findById(id);

    if (!job) throw new NotFoundException('Job not found');

    const applicant = job.applicants.find(
      (applicant) => applicant.user.toString() === userId,
    );

    if (!applicant) throw new NotFoundException('Applicant not found');

    applicant.status = status;

    await job.save();

    return job;
  }
}
