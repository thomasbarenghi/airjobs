import { IsNotEmpty } from "class-validator";

export class ApplyJobDto {
  @IsNotEmpty({ message: 'userId is required' })
  userId: string;

  resume: string;
}
