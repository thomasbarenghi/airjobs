import { IsNotEmpty } from 'class-validator';
import { Company } from '../entities/user.entity';
import { OmitType } from '@nestjs/mapped-types';

export class AddCompanyDto extends Company {
    @IsNotEmpty({ message: 'userId is empty' })
    userId: string;
}
