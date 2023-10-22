import { IsNotEmpty } from 'class-validator';
import { Job } from '../entities/job.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateJobDto extends OmitType(Job, ['_id', 'owner'] as const) {
  @IsNotEmpty({ message: 'ownerId is empty' })
  ownerId: string;
}
