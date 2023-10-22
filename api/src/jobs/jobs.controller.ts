import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplyJobDto } from './dto/apply-job.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService, private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll(@Query('country') country: string) {
    return this.jobsService.findAll(country);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }

  @Post(':id/apply')
  @UseInterceptors(FileInterceptor('resume'))
  async apply(
    @Param('id') id: string,
    @Body() applyJobDto: ApplyJobDto,
    @UploadedFile() resume: Express.Multer.File,
  ) {
    if (resume) {
      applyJobDto.resume = await this.cloudinaryService.uploadFile(resume);
    }
    console.log(applyJobDto);
    return await this.jobsService.apply(id, applyJobDto);
  }

  @Post(':id/unapply')
  unapply(@Param('id') id: string, @Body() body: { userId: string }) {
    return this.jobsService.unapply(id, body.userId);
  }

  @Post(':id/update-applicant')
  updateApplicant(
    @Param('id') id: string,
    @Body() updateApplicantDto: UpdateApplicantDto,
  ) {
    return this.jobsService.updateApplicant(id, updateApplicantDto);
  }
}
