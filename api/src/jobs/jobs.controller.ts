import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplyJobDto } from './dto/apply-job.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Public } from 'src/auth/auth.decorator';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /**
   * Creates a new job listing.
   *
   * @param createJobDto - The data transfer object (DTO) for creating a job.
   * @returns The created job.
   */
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  /**
   * Retrieves all job listings, with optional filters for country and title.
   *
   * @param country - The country to filter jobs by.
   * @param title - The title to filter jobs by.
   * @returns A list of jobs matching the specified filters.
   */
  @Public()
  @Get()
  findAll(@Query('country') country: string, @Query('title') title: string) {
    return this.jobsService.findAll(country, title);
  }

  /**
   * Retrieves a single job listing by its ID.
   *
   * @param id - The ID of the job to retrieve.
   * @returns The job listing with the specified ID.
   */
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  /**
   * Updates a job listing by its ID.
   *
   * @param id - The ID of the job to update.
   * @param updateJobDto - The data transfer object (DTO) for updating the job.
   * @returns The updated job.
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateJobDto: any) {
    return this.jobsService.update(id, updateJobDto);
  }

  /**
   * Removes a job listing by its ID.
   *
   * @param id - The ID of the job to remove.
   * @returns A confirmation of the job removal.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }

  /**
   * Allows a user to apply for a job, with the option to upload a resume.
   *
   * @param id - The ID of the job to apply for.
   * @param applyJobDto - The data transfer object (DTO) for applying to the job.
   * @param resume - The resume file uploaded by the user.
   * @returns The job listing with the applicant's information.
   */
  @Post(':id/apply')
  @UseInterceptors(FileInterceptor('resume'))
  async apply(
    @Param('id') id: string,
    @Body() applyJobDto: ApplyJobDto,
    @UploadedFile() resume: Express.Multer.File,
  ) {
    if (resume)
      applyJobDto.resume = await this.cloudinaryService.uploadFile(resume);

    return await this.jobsService.apply(id, applyJobDto);
  }

  /**
   * Allows a user to unapply from a job.
   *
   * @param id - The ID of the job to unapply from.
   * @param body - The body containing the user ID.
   * @returns A confirmation of the unapplication.
   */
  @Post(':id/unapply')
  unapply(@Param('id') id: string, @Body() body: { userId: string }) {
    return this.jobsService.unapply(id, body.userId);
  }

  /**
   * Updates an applicant's status for a specific job.
   *
   * @param id - The ID of the job where the applicant is applying.
   * @param updateApplicantDto - The data transfer object (DTO) for updating the applicant's status.
   * @returns The updated job listing with the applicant's status.
   */
  @Put(':id/update-applicant')
  updateApplicant(
    @Param('id') id: string,
    @Body() updateApplicantDto: UpdateApplicantDto,
  ) {
    return this.jobsService.updateApplicant(id, updateApplicantDto);
  }
}
