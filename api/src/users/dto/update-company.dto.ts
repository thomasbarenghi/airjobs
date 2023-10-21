import { PartialType } from '@nestjs/mapped-types';
import { AddCompanyDto } from './add-company.dto';

export class UpdateCompanyDto extends PartialType(AddCompanyDto) {}
