import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll(
    @Query('country') country: string,
  ) {
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
  apply(@Param('id') id: string, @Body() body: { userId: string }) {
    return this.jobsService.apply(id, body.userId);
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
