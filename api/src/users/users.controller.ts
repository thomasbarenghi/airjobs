import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddCompanyDto } from './dto/add-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { EditPasswordDto } from './dto/edit-password.dto';
import { Public } from 'src/auth/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // PUBLIC ENDPOINTS ----------------------------------------------------------

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // PRIVATE ENDPOINTS ---------------------------------------------------------

  @Get()
  @Public()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return this.usersService.findUser(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('profileImage'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    profileImage?: Express.Multer.File,
  ) {
    if (profileImage) {
      updateUserDto.profileImage = await this.cloudinaryService.uploadImage(
        profileImage,
      );
    }

    return this.usersService.update(id, updateUserDto);
  }

  @Put(':id/edit-password')
  async editPassword(
    @Param('id') id: string,
    @Body() editPasswordDto: EditPasswordDto,
  ) {
    return this.usersService.editPassword(id, editPasswordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post(':id/add-company-details')
  @UseInterceptors(FileInterceptor('logo'))
  async addCompanyDetails(
    @Param('id') id: string,
    @Body() addCompanyDto: AddCompanyDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    logo?: Express.Multer.File,
  ) {
    if (logo) {
      addCompanyDto.logo = await this.cloudinaryService.uploadImage(logo);
    }

    return this.usersService.manageCompanyDetails(id, addCompanyDto);
  }

  @Put(':id/edit-company-details')
  @UseInterceptors(FileInterceptor('logo'))
  async editCompanyDetails(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    logo?: Express.Multer.File,
  ) {
    if (logo) {
      updateCompanyDto.logo = await this.cloudinaryService.uploadImage(logo);
    }

    return this.usersService.manageCompanyDetails(id, updateCompanyDto);
  }
}
