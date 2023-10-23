import {
  BadRequestException,
  ConflictException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { populateUser } from './lib/populate-user.lib';

export const calculateAge = (birthday: Date) => {
  const isAdult =
    (new Date().getTime() - new Date(birthday).getTime()) /
      (365 * 24 * 60 * 60 * 1000) >=
    18;

  if (!isAdult) throw new NotAcceptableException('You must be 18 or older');

  return isAdult;
};

export async function checkUniqueData(
  email: string | undefined,
  username: string | undefined,
  userModel: Model<User>,
  id?: string | undefined,
): Promise<void> {
  if (!email && !username) {
    return;
  }

  const filter: any = {};

  if (email) {
    filter.$or = filter.$or || [];
    filter.$or.push({ email });
  }

  if (username) {
    filter.$or = filter.$or || [];
    filter.$or.push({ username });
  }

  if (id) {
    filter._id = { $ne: id };
  }

  const existingUser = await userModel.findOne(filter);

  if (existingUser) {
    const message =
      email && existingUser.email === email
        ? 'Email already exists'
        : 'Username already exists';
    throw new ConflictException(message);
  }
}

export const findUser = async (id: string, userModel: Model<User>) => {
  const query = id?.includes('@') ? { email: id } : { _id: id };
  const user = await userModel.findOne(query).populate(populateUser).exec();

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return user;
};

export const removeJobFromUser = async (
  userId: string,
  jobId: string,
  userModel: Model<User>,
) => {
  const user = await findUser(userId, userModel);

  user.jobs.created = user.jobs.created.filter(
    (job) => job.toString() !== jobId,
  );
  user.jobs.applied = user.jobs.applied.filter(
    (job) => job.toString() !== jobId,
  );

  user.markModified('jobs');
  await user.save();
};
