import {
  BadRequestException,
  ConflictException,
  Injectable,
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
import { calculateAge, checkUniqueData, findUser } from './utils';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    calculateAge(createUserDto.birthday);
    await checkUniqueData(
      createUserDto.email,
      createUserDto.username,
      this.userModel,
    );
    createUserDto.password = await encryptPassword(createUserDto.password);
    return await new this.userModel(createUserDto).save();
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await findUser(id, this.userModel);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await findUser(id, this.userModel);
    if (updateUserDto.birthday) {
      calculateAge(updateUserDto.birthday);
    }
    const imageValid = validateUrl(updateUserDto.profileImage);
    if (!imageValid) delete updateUserDto.profileImage;
    await checkUniqueData(
      updateUserDto.email,
      updateUserDto.username,
      this.userModel,
      id,
    );
    user.set(updateUserDto);
    await user.save();
    return user;
  }

  async remove(id: string) {
    await findUser(id, this.userModel);
    return await this.userModel.findByIdAndDelete(id).catch((error) => {
      console.error(error);
      throw new BadRequestException();
    });
  }

  async addCompanyDetails(id: string, addCompanyDto: AddCompanyDto) {
    const user = await findUser(id, this.userModel);
    if (user.role !== 'company')
      throw new ConflictException('User is not a company');

    const imageValid = validateUrl(addCompanyDto.logo);
    if (!imageValid) delete addCompanyDto.logo;
    user.company = addCompanyDto;
    user.markModified('company');
    await user.save();
    return user.company;
  }

  async editCompanyDetails(id: string, updateCompanyDto: UpdateCompanyDto) {
    const user = await findUser(id, this.userModel);
    if (user.role !== 'company')
      throw new ConflictException('User is not a company');

    const imageValid = validateUrl(updateCompanyDto.logo);
    if (!imageValid) delete updateCompanyDto.logo;
    user.set({ company: updateCompanyDto });
    user.markModified('company');
    await user.save();
    return user;
  }

  async editPassword(id: string, editPasswordDto: EditPasswordDto) {
    const user = await findUser(id, this.userModel);
    comparePasswords(editPasswordDto.oldPassword, user.password);
    user.password = await encryptPassword(editPasswordDto.newPassword);
    await user.save();
    return user;
  }
}
