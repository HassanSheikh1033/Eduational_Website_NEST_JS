import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      avatar: createUserDto.avatar || null,
    });
    return createdUser.save();
  }

  // Login user
  async login(email: string, password: string): Promise<{ accessToken: string; user: Partial<User> }> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new UnauthorizedException('Email does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid Password');

    const payload = { email: user.email, sub: user._id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return {
      accessToken,
      user: { _id: user._id.toString(), email: user.email, username: user.username },
    };
  }

  // Find all users
  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  // Find one user by ID
  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  // Update a user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return user.save();
  }

  // Delete a user
  async remove(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`User with ID ${id} not found`);
  }
}
