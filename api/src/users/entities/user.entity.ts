import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {
  HydratedDocument,
  ObjectId,
  PopulatedDoc,
  Document,
} from 'mongoose';
import {
  IsNotEmpty,
  IsEmail,
  Matches,
  IsString,
  IsDateString,
} from 'class-validator';
import { Job } from 'src/jobs/entities/job.entity';

export type SessionDocument = HydratedDocument<User>;

class JobsEnum {
  constructor() {
    this.created = [];
    this.applied = [];
  }

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    default: [],
  })
  created: PopulatedDoc<Job & Document>[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    default: [],
  })
  applied: PopulatedDoc<Job & Document>[];
}

@Schema({ _id: false })
export class Company {
  @Prop({ required: true, default: '' })
  @IsNotEmpty({ message: 'name is empty' })
  @IsString()
  name: string;

  @Prop({ required: true, default: '' })
  @IsNotEmpty({ message: 'description is empty' })
  @IsString()
  description: string;

  @Prop({ required: true, default: '' })
  @IsNotEmpty({ message: 'website is empty' })
  website: string;

  @Prop({
    required: true,
    default: 'https://airjobs.vercel.app/image/placeholder.png',
  })
  logo: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'email is empty' })
  @IsEmail()
  email: string;
}

@Schema()
export class User {
  _id: ObjectId;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'firstName is required' })
  @IsString()
  firstName: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'lastName is required' })
  @IsString()
  lastName: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'birthday is required' })
  @IsDateString()
  birthday: Date;

  @Prop({ required: true, unique: true })
  @IsNotEmpty({ message: 'email is invalid' })
  @IsEmail()
  email: string;

  @Prop({ required: true, default: 'aspirant' })
  @IsNotEmpty({ message: 'role is required' })
  @Matches(/^(company|aspirant)$/, {
    message: 'role must be company or aspirant',
  })
  role: 'company' | 'aspirant';

  @Prop({ required: true })
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @Prop({ required: true, unique: true })
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @Prop({
    required: true,
    default: 'https://airjobs.vercel.app/image/placeholder.png',
  })
  profileImage: string;

  @Prop({ required: false, default: null, type: Company })
  company?: Company | null;

  @Prop({
    type: JobsEnum,
    default: new JobsEnum(),
  })
  jobs?: JobsEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
