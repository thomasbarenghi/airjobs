import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './entities/job.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: User.name, schema: UserSchema },
    ]),
    CloudinaryModule,
    UsersModule,
  ],
  controllers: [JobsController],
  providers: [JobsService, UsersService],
})
export class JobsModule {}
