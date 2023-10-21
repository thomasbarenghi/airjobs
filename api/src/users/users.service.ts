import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { encryptPassword } from 'src/utils/bcrypt.utils';
import { AddCompanyDto } from './dto/add-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private calculateAge(birthday: Date) {
    const isAdult =
      (new Date().getTime() - new Date(birthday).getTime()) /
        (365 * 24 * 60 * 60 * 1000) >=
      18;

    if (!isAdult) throw new NotAcceptableException('You must be 18 or older');

    return isAdult;
  }

  private async findUser(id: string) {
    const user = await this.userModel.findById(id).catch((error) => {
      console.error(error);
      throw new BadRequestException();
    });

    if (!user) throw new BadRequestException('User not found');

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    this.calculateAge(createUserDto.birthday);

    const email = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (email) throw new ConflictException('Email already exists');

    const username = await this.userModel.findOne({
      username: createUserDto.username,
    });

    if (username) throw new ConflictException('Username already exists');
    createUserDto.password = await encryptPassword(createUserDto.password);
    return await new this.userModel(createUserDto).save();
  }

  async findAll() {
    return await this.userModel.find().catch((error) => {
      console.error(error);
      throw new BadRequestException();
    });
  }

  async findOne(id: string) {
    return await this.findUser(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).catch((error) => {
      console.error(error);
      throw new BadRequestException();
    });
  }

  async addCompanyDetails(addCompanyDto: AddCompanyDto) {
    const user = await this.findUser(addCompanyDto.userId);
    if (user.role !== 'company')
      throw new ConflictException('User is not a company');
    delete addCompanyDto.userId;
    user.company = addCompanyDto || null;
    await user.save();
    return user.company;
  }

  async editCompanyDetails(updateCompanyDto: UpdateCompanyDto) {
    const user = await this.findUser(updateCompanyDto.userId);
    if (user.role !== 'company')
      throw new ConflictException('User is not a company');
    delete updateCompanyDto.userId;
    user.company = {
      ...user.company,
      ...updateCompanyDto,
    };
    await user.save();
    return user.company;
  }
}
