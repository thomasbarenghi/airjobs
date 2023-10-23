import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddCompanyDto } from './dto/add-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { EditPasswordDto } from './dto/edit-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('profileImage'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    if (profileImage)
      updateUserDto.profileImage = await this.cloudinaryService.uploadImage(
        profileImage,
      );

    return await this.usersService.update(id, updateUserDto);
  }

  @Put(':id/edit-password')
  editPassword(
    @Param('id') id: string,
    @Body() editPasswordDto: EditPasswordDto,
  ) {
    return this.usersService.editPassword(id, editPasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post(':id/add-company-details')
  @UseInterceptors(FileInterceptor('logo'))
  async addCompanyDetails(
    @Param('id') id: string,
    @Body() addCompanyDto: AddCompanyDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    if (logo)
      addCompanyDto.logo = await this.cloudinaryService.uploadImage(logo);

    return this.usersService.addCompanyDetails(id, addCompanyDto);
  }

  @Put(':id/edit-company-details')
  @UseInterceptors(FileInterceptor('logo'))
  async editCompanyDetails(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    console.log('updateCompanyDto', updateCompanyDto);
    if (logo)
      updateCompanyDto.logo = await this.cloudinaryService.uploadImage(logo);

    return this.usersService.editCompanyDetails(id, updateCompanyDto);
  }
}
