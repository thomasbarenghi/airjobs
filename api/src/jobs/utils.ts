import { ConflictException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Job } from './entities/job.entity';
import { User } from 'src/users/entities/user.entity';

export const verifyIsCompany = (user) => {
  const isCompany = user.role === 'company';
  if (!isCompany) throw new ConflictException('User is not a company');

  return isCompany;
};

export const verifyIsAspirant = (user: User) => {
  const isApplicant = user.role === 'aspirant';
  if (!isApplicant) throw new ConflictException('User is not an applicant');

  return isApplicant;
};

export const verifyHasApplied = (user: User, job: Job, exception: boolean) => {
  const hasApplied = job.applicants.find(
    (applicant) => applicant.user.toString() === user._id.toString(),
  );
  if (!hasApplied && exception)
    throw new ConflictException('User has not applied');

  return hasApplied;
};

export const verifyHasCompany = (user) => {
  const hasCompany = user.company !== null;
  if (!hasCompany) throw new ConflictException('User has no company');

  return hasCompany;
};

export const verifyIsOwner = (user, job) => {
  const isOwner = user._id.toString() === job.owner._id.toString();
  if (!isOwner) throw new ConflictException('User is not the owner');

  return isOwner;
};

export const findJob = async (id: string, jobModel: Model<Job>) => {
  const job = await jobModel.findById(id).populate([
    {
      path: 'owner',
      model: 'User',
    },
    { path: 'applicants.user', model: 'User' },
  ]);

  if (!job) throw new NotFoundException('Job not found');

  return job;
};
