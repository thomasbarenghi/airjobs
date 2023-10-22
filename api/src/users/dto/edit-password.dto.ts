import { IsNotEmpty } from 'class-validator';
import { Company } from '../entities/user.entity';
import { OmitType } from '@nestjs/mapped-types';

export class EditPasswordDto {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;
}
