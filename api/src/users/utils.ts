import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { populateUser } from './users.service';

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
    (job) => job._id.toString() !== jobId,
  );
  user.jobs.applied = user.jobs.applied.filter(
    (job) => job._id.toString() !== jobId,
  );

  user.markModified('jobs');
  await user.save();
};
