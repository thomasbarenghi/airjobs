import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { ApplyJobDto } from './dto/apply-job.dto';
import { validateUrl } from 'src/utils/validate-url.utils';
import { UsersService } from 'src/users/users.service';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    private readonly usersService: UsersService,
  ) {}

  // PUBLIC METHODS ------------------------------------------------------------

  /**
   * Creates a new job posting.
   * @param createJobDto - Job data transfer object.
   * @returns The created job.
   */
  async create(createJobDto: CreateJobDto) {
    const user = await this.usersService.findUser(createJobDto.ownerId);
    this.verifyIsCompany(user);
    this.verifyHasCompany(user);

    const job = await this.jobModel.create({
      ...createJobDto,
      owner: user._id,
    });

    user.jobs.created.push(job._id);
    user.markModified('jobs');
    await user.save();

    return job;
  }

  /**
   * Retrieves all job postings with optional filtering by country and title.
   * @param country - Optional country filter.
   * @param title - Optional title filter.
   * @returns A list of job postings.
   */
  async findAll(country?: string, title?: string) {
    return this.jobModel
      .find({
        ...(country && { country }),
        ...(title && { title: { $regex: title, $options: 'i' } }),
      })
      .populate({ path: 'owner', model: 'User' });
  }

  /**
   * Retrieves a specific job by ID.
   * @param id - The job ID.
   * @returns The job details.
   */
  async findOne(id: string) {
    return this.findJob(id);
  }

  /**
   * Updates an existing job posting.
   * @param id - The job ID.
   * @param updateJobDto - Updated job data.
   * @returns The updated job.
   */
  async update(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.findJob(id);
    const user = await this.usersService.findUser(updateJobDto.ownerId);
    this.verifyIsCompany(user);
    this.verifyIsOwner(user, job);

    delete updateJobDto.ownerId;
    job.set(updateJobDto);
    await job.save();

    return job;
  }

  /**
   * Deletes a job posting and removes references from users.
   * @param id - The job ID.
   * @returns The deleted job.
   */
  async remove(id: string) {
    const job = await this.findJob(id);
    await this.usersService.removeJobFromUser(job.owner._id.toString(), id);
    await this.jobModel.updateMany(
      { 'jobs.applied': id },
      { $pull: { 'jobs.applied': id } },
    );
    return this.jobModel.findByIdAndDelete(id);
  }

  /**
   * Allows a user to apply for a job.
   * @param id - The job ID.
   * @param applyJobDto - Application data.
   * @returns The updated job with the new applicant.
   */
  async apply(id: string, applyJobDto: ApplyJobDto) {
    await validateUrl(applyJobDto.resume);
    const user = await this.usersService.findUser(applyJobDto.userId);
    this.verifyIsAspirant(user);
    const job = await this.findJob(id);

    if (job.maxApplicants === job.applicants.length) {
      throw new ConflictException('Job is full');
    }

    if (this.hasUserApplied(user, job)) {
      throw new ConflictException('User has already applied');
    }

    job.applicants.push({
      user: user._id,
      status: 'Under review',
      resume: applyJobDto.resume,
      createdAt: new Date(),
    });

    await job.save();
    user.jobs.applied.push(job._id);
    user.markModified('jobs');
    await user.save();

    return job;
  }

  /**
   * Allows a user to withdraw their application from a job.
   * @param id - The job ID.
   * @param userId - The user ID.
   * @returns The updated job without the withdrawn application.
   * @throws ConflictException if the user has not applied to the job.
   */
  async unapply(id: string, userId: string) {
    const job = await this.findJob(id);
    const user = await this.usersService.findUser(userId);
    this.verifyIsAspirant(user);

    const applicationIndex = job.applicants.findIndex(
      (applicant) => applicant.user._id.toString() === userId,
    );

    if (applicationIndex === -1) {
      throw new ConflictException('User has not applied to this job');
    }

    job.applicants.splice(applicationIndex, 1);
    await job.save();

    await this.usersService.removeJobFromUser(userId, id);

    return job;
  }

  /**
   * Updates the status of an applicant for a specific job.
   *
   * @param id - The job ID.
   * @param updateApplicantDto - DTO containing the user ID and status to update.
   * @returns The updated job with modified applicants list.
   * @throws NotFoundException - If the applicant is not found.
   */
  async updateApplicant(id: string, updateApplicantDto: UpdateApplicantDto) {
    const { userId, status } = updateApplicantDto;

    // Find user and verify aspirant status
    const user = await this.usersService.findUser(userId);
    this.verifyIsAspirant(user);

    // Find job and verify applicant status
    const job = await this.findJob(id);
    this.verifyHasApplied(user, job, true);

    // Find the applicant and update their status
    const applicant = job.applicants.find(
      (applicant) => applicant.user._id.toString() === userId,
    );

    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }

    // Update applicant status and save the job
    applicant.status = status;
    job.markModified('applicants');
    await job.save();

    return job;
  }

  // PRIVATE METHODS ------------------------------------------------------------

  /**
   * Finds a job by ID.
   * @param id - The job ID.
   * @returns The job document.
   * @throws NotFoundException if job does not exist.
   */
  private async findJob(id: string) {
    const job = await this.jobModel.findById(id).populate([
      { path: 'owner', model: 'User' },
      { path: 'applicants.user', model: 'User' },
    ]);

    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  /**
   * Verifies if a user has applied for a specific job.
   *
   * @param user - The user object to verify.
   * @param job - The job object where applicants are stored.
   * @param exception - A flag to indicate if an exception should be thrown if the user has not applied.
   * @returns True if the user has applied, otherwise false.
   * @throws ConflictException - If the user has not applied and the exception flag is true.
   */
  verifyHasApplied = (user: User, job: Job, exception: boolean): boolean => {
    const hasApplied = job.applicants.some(
      (applicant) => applicant.user._id.toString() === user._id.toString(),
    );

    if (!hasApplied && exception) {
      throw new ConflictException('User has not applied');
    }

    return hasApplied;
  };

  /**
   * Checks if a user is the owner of a job.
   * @param user - The user document.
   * @param job - The job document.
   * @throws UnauthorizedException if the user is not the owner.
   */
  private verifyIsOwner(user: User, job: Job): void {
    if (user._id.toString() !== job.owner._id.toString()) {
      throw new UnauthorizedException('User is not the owner');
    }
  }

  /**
   * Checks if a user has already applied to a job.
   * @param user - The user document.
   * @param job - The job document.
   * @returns True if the user has applied, false otherwise.
   */
  private hasUserApplied(user: User, job: Job): boolean {
    return job.applicants.some(
      (applicant) => applicant.user._id.toString() === user._id.toString(),
    );
  }

  /**
   * Checks if the user is a company.
   * @param user - The user document.
   * @throws UnauthorizedException if the user is not a company.
   */
  private verifyIsCompany(user: User): void {
    if (user.role !== 'company') {
      throw new UnauthorizedException('User must be a company');
    }
  }

  /**
   * Checks if the company has been properly registered.
   * @param user - The user document.
   * @throws ConflictException if the company is not registered.
   */
  private verifyHasCompany(user: User): void {
    if (user.company === null) {
      throw new ConflictException('Company must be registered');
    }
  }

  /**
   * Checks if the user is an aspirant (not a company).
   * @param user - The user document.
   * @throws UnauthorizedException if the user is a company.
   */
  private verifyIsAspirant(user: User): void {
    if (user.role !== 'aspirant') {
      throw new UnauthorizedException(
        'User must be an aspirant, not a company',
      );
    }
  }
}
