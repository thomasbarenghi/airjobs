import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import {
  IsNotEmpty,
  Matches,
  IsNumber,
  IsString,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export type SessionDocument = HydratedDocument<Job>;

class ApplicantsEnum {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: ObjectId;

  @Prop({ required: true, default: 'Under review' })
  @IsNotEmpty({ message: 'status is required' })
  @Matches(/^(Under review|Interested company|Obtained|Rejected)$/, {
    message:
      'status must be Under review, Interested company, Obtained or Rejected',
  })
  status: 'Under review' | 'Interested company' | 'Obtained' | 'Rejected';

  @Prop({ required: true, default: '' })
  @IsNotEmpty({ message: 'resume is required' })
  @IsString()
  resume: string;
}

@Schema({ timestamps: true })
export class Job {
  _id: ObjectId;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'title is required' })
  @IsString()
  title: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'description is required' })
  @IsString()
  description: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'country is required' })
  @IsString()
  country: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'seniority is invalid' })
  @Matches(/^(Junior|Mid|Senior)$/, {
    message: 'seniority must be Junior, Mid or Senior',
  })
  @IsString()
  seniority: 'Junior' | 'Mid' | 'Senior';

  @Prop({ required: true, default: 'Full-time' })
  @IsNotEmpty({ message: 'type is required' })
  @Matches(/^(Full-time|Part-time|Contract|Internship|Temporary)$/, {
    message:
      'type must be Full-time, Part-time, Contract, Internship or Temporary',
  })
  @IsString()
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Temporary';

  @Prop({ required: true })
  @IsNotEmpty({ message: 'location is required' })
  @Matches(/^(Remote|On-site|Hybrid)$/, {
    message: 'location must be Remote, On-site or Hybrid',
  })
  @IsString()
  location: 'Remote' | 'On-site' | 'Hybrid';

  @Prop({ required: true })
  @IsNotEmpty({ message: 'salary is required' })
  @IsNumber()
  salary: number;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'currency is required' })
  @IsString()
  currency: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner?: ObjectId;

  @Prop({ required: true, default: true })
  @IsNotEmpty({ message: 'active is required' })
  @IsBoolean()
  active: boolean;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'deadline is required' })
  @IsDateString()
  deadline: Date;

  @Prop({
    default: [],
  })
  applicants: ApplicantsEnum[];

  @Prop({ required: true, default: 50 })
  @IsNotEmpty({ message: 'maxApplicants is required' })
  @IsNumber()
  maxApplicants: number;

  createdAt: Date;
  updatedAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
