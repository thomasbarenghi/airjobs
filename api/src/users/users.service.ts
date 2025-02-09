import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { comparePasswords, encryptPassword } from 'src/utils/bcrypt.utils';
import { AddCompanyDto } from './dto/add-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { EditPasswordDto } from './dto/edit-password.dto';
import { validateUrl } from 'src/utils/validate-url.utils';

export const populateUser = {
  path: 'jobs',
  populate: [
    {
      path: 'created',
      model: 'Job',
      populate: {
        path: 'owner',
        model: 'User',
      },
    },
    {
      path: 'applied',
      model: 'Job',
      populate: {
        path: 'owner',
        model: 'User',
      },
    },
  ],
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // PUBLIC METHODS ------------------------------------------------------------

  /**
   * Creates a new user in the database.
   * @param {CreateUserDto} createUserDto - Data Transfer Object containing user details.
   * @returns {Promise<User>} The created user.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    this.validateUserData(createUserDto);
    createUserDto.password = await encryptPassword(createUserDto.password);
    return new this.userModel(createUserDto).save();
  }

  /**
   * Retrieves all users from the database.
   * @returns {Promise<User[]>} List of all users.
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * Updates a user's details.
   * @param {string} id - User ID.
   * @param {UpdateUserDto} updateUserDto - DTO containing updated user data.
   * @returns {Promise<User>} The updated user.
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUser(id);

    this.validateUserData(updateUserDto, id);

    if (updateUserDto.birthday)
      this.calculateAge(new Date(updateUserDto.birthday));
    if (
      updateUserDto.profileImage &&
      !validateUrl(updateUserDto.profileImage)
    ) {
      delete updateUserDto.profileImage;
    }

    user.set(updateUserDto);
    await user.save();
    return user;
  }

  /**
   * Deletes a user from the database.
   * @param {string} id - User ID.
   * @returns {Promise<User>} The deleted user.
   * @throws NotFoundException if the user is not found.
   * @throws BadRequestException if the deletion fails.
   */
  async remove(id: string): Promise<User> {
    await this.findUser(id); // Ensure the user exists

    return this.userModel
      .findByIdAndDelete(id)
      .exec()
      .then((deletedUser) => {
        if (!deletedUser) {
          throw new NotFoundException(`User with ID '${id}' not found`);
        }
        return deletedUser;
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        throw new BadRequestException('Failed to delete user');
      });
  }

  /**
   * Adds or updates company details for a user profile.
   * @param {string} id - User ID.
   * @param {AddCompanyDto | UpdateCompanyDto} companyDto - DTO with company information.
   * @returns {Promise<object>} The updated company details.
   */
  async manageCompanyDetails(
    id: string,
    companyDto: AddCompanyDto | UpdateCompanyDto,
  ): Promise<object> {
    const user = await this.findUser(id);

    if (user.role !== 'company') {
      throw new ConflictException('User is not a company');
    }

    if (companyDto.logo && !validateUrl(companyDto.logo)) {
      delete companyDto.logo;
    }

    const imageValid = validateUrl(companyDto.logo);
    if (!imageValid) companyDto.logo = user.company.logo;
    user.set({ company: companyDto });

    user.markModified('company');
    await user.save();

    return user.company;
  }

  /**
   * Updates a user's password.
   * @param {string} id - User ID.
   * @param {EditPasswordDto} editPasswordDto - DTO with old and new passwords.
   * @returns {Promise<User>} The updated user.
   */
  async editPassword(
    id: string,
    editPasswordDto: EditPasswordDto,
  ): Promise<User> {
    const user = await this.findUser(id);

    const isMatch = await comparePasswords(
      editPasswordDto.oldPassword,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Incorrect current password');
    }

    user.password = await encryptPassword(editPasswordDto.newPassword);
    await user.save();

    return user;
  }

  /**
   * Finds a user by ID or email.
   * @param {string} id - User ID or email.
   * @throws NotFoundException if no user is found.
   * @throws BadRequestException if the email format is invalid.
   */
  async findUser(id: string) {
    if (!id) {
      throw new NotFoundException('User ID or email must be provided');
    }

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the input is an email and validate its format
    const isEmail = id.includes('@');
    if (isEmail && !emailRegex.test(id)) {
      throw new BadRequestException('Invalid email format');
    }

    // Define the query based on whether the input is an email or ID
    const query = isEmail ? { email: id } : { _id: id };
    const user = await this.userModel
      .findOne(query)
      .populate(populateUser)
      .exec();

    if (!user) {
      throw new NotFoundException(
        `User with ${isEmail ? 'email' : 'ID'} '${id}' not found`,
      );
    }

    return user;
  }

  async removeJobFromUser(userId: string, jobId: string) {
    const user = await this.findUser(userId);

    user.jobs.created = user.jobs.created.filter(
      (job) => job._id.toString() !== jobId,
    );
    user.jobs.applied = user.jobs.applied.filter(
      (job) => job._id.toString() !== jobId,
    );

    user.markModified('jobs.applied');
    user.markModified('jobs.created');
    await user.save();
  }

  // PRIVATE METHODS ------------------------------------------------------------

  /**
   * Validates user data, including uniqueness of email and username.
   * @param {CreateUserDto | UpdateUserDto} userDto - User data to validate.
   * @param {string} [excludeId] - Optional ID to exclude from uniqueness checks.
   * @throws ConflictException if email or username is already taken.
   */
  private async validateUserData(
    userDto: CreateUserDto | UpdateUserDto,
    excludeId?: string,
  ): Promise<void> {
    if (userDto.birthday) {
      this.calculateAge(new Date(userDto.birthday));
    }

    if (userDto.email || userDto.username) {
      await this.checkUniqueData(userDto.email, userDto.username, excludeId);
    }
  }

  /**
   * Checks if the given email or username already exists in the database.
   * @param {string} [email] - User's email to check.
   * @param {string} [username] - User's username to check.
   * @param {string} [excludeId] - Optional ID to exclude from the search.
   * @throws ConflictException if the email or username already exists.
   */
  private async checkUniqueData(
    email?: string,
    username?: string,
    excludeId?: string,
  ): Promise<void> {
    const filter: any = { $or: [] };

    if (email) filter.$or.push({ email });
    if (username) filter.$or.push({ username });
    if (excludeId) filter._id = { $ne: excludeId };

    if (filter.$or.length > 0) {
      const existingUser = await this.userModel.findOne(filter).exec();
      if (existingUser) {
        throw new ConflictException(
          email === existingUser.email
            ? 'Email already exists'
            : 'Username already exists',
        );
      }
    }
  }

  /**
   * Calculates the age based on the provided birthday.
   * @param {Date} birthday - The user's birthday.
   * @throws NotAcceptableException if the user is under 18 or the date is invalid.
   */
  private calculateAge(birthday: Date): void {
    if (!(birthday instanceof Date) || isNaN(birthday.getTime())) {
      console.log('no aceptable ', birthday);

      throw new NotAcceptableException('Invalid date format');
    }

    const today = new Date();
    const birthDate = new Date(birthday);

    let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
    const isBirthdayPassed =
      today.getUTCMonth() > birthDate.getUTCMonth() ||
      (today.getUTCMonth() === birthDate.getUTCMonth() &&
        today.getUTCDate() >= birthDate.getUTCDate());

    if (!isBirthdayPassed) age--;

    if (age < 18) {
      throw new NotAcceptableException('You must be 18 or older');
    }
  }
}
