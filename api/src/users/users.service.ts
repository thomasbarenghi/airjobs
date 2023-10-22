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
import { populateUser } from './lib/populate-user.lib';
import { EditPasswordDto } from './dto/edit-password.dto';

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
    const user = await this.userModel
      .findById(id)
      .populate(populateUser)
      .catch((error) => {
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
    const isEmail = id.includes('@');
    if (isEmail) {
      const user = await this.userModel
        .findOne({ email: id })
        .populate(populateUser);
      if (!user) throw new NotFoundException('User not found');
      return user;
    }
    return await this.findUser(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUser(id);

    if (updateUserDto.birthday) {
      this.calculateAge(updateUserDto.birthday);
    }

    const linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (updateUserDto.profileImage) {
      if (!linkRegex.test(updateUserDto.profileImage))
        delete updateUserDto.profileImage;
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const email = await this.userModel.findOne({
        email: updateUserDto.email,
      });

      if (email) throw new ConflictException('Email already exists');
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const username = await this.userModel.findOne({
        username: updateUserDto.username,
      });

      if (username) throw new ConflictException('Username already exists');
    }

    user.set(updateUserDto);
    await user.save();
    return user;
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).catch((error) => {
      console.error(error);
      throw new BadRequestException();
    });
  }

  async addCompanyDetails(id: string, addCompanyDto: AddCompanyDto) {
    const user = await this.findUser(id);
    if (user.role !== 'company')
      throw new ConflictException('User is not a company');

      const linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
      if (addCompanyDto.logo) {
        if (!linkRegex.test(addCompanyDto.logo))
          delete addCompanyDto.logo;
      }

    user.company = {
      ...addCompanyDto,
    };
    await user.save();
    return user.company;
  }

  async editCompanyDetails(id: string, updateCompanyDto: UpdateCompanyDto) {
    console.log('updateCompanyDto', updateCompanyDto);
    const user = await this.findUser(id);
    if (user.role !== 'company')
      throw new ConflictException('User is not a company');
      const linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
      if (updateCompanyDto.logo) {
        console.log("hay logo")
        if (!linkRegex.test(updateCompanyDto.logo)){
          console.log("no es link")
        console.log('updateCompanyDto.logo', updateCompanyDto.logo);
          delete updateCompanyDto.logo;}
      }

    user.set({ company: updateCompanyDto });
    console.log('user.company', user.company);
    user.markModified('company');
    await user.save();
    return user.company;
  }

  async editPassword(id: string, editPasswordDto: EditPasswordDto) {
    const user = await this.findUser(id);
    comparePasswords(editPasswordDto.oldPassword, user.password);
    user.password = await encryptPassword(editPasswordDto.newPassword);
    await user.save();
    return user;
  }
}
