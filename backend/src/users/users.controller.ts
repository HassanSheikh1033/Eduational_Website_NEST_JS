import { Controller, Post, Body, Get, Param, Patch, Delete, UseInterceptors, BadRequestException, UploadedFile, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { User } from './user.schema';
import { diskStorage } from 'multer';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully.', type: User }) 
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> { 
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: LoginUserDto) {
    return this.usersService.login(body.email, body.password);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] }) 
  async findAll(): Promise<User[]> { 
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({ status: 200, description: 'User found', type: User }) 
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string): Promise<User> { 
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: User }) 
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> { 
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 204, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }




  @Patch(':id/avatar')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './uploads', 
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); 
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
      const allowedTypes = /jpeg|jpg|png|gif/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (mimetype && extname) {
        return callback(null, true);
      } else {
        return callback(new BadRequestException('Only images are allowed!'), false);
      }
    },
  }))
  async updateAvatar(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<User> {
    if (!file) throw new BadRequestException('No file uploaded.');

    const avatarUrl = `/uploads/${file.filename}`; 
    const user = await this.usersService.findOne(id);

    if (!user) throw new NotFoundException(`User with ID ${id} not found.`);

    try {
      user.avatar = avatarUrl;
      return await this.usersService.update(id, user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to upload avatar.');
    }
  }

}

