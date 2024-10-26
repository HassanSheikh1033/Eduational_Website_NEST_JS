import { IsString, IsEmail, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Avatar must be a valid URL' })
  avatar?: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  password?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Avatar must be a valid URL' })
  @ApiProperty({ required: false })
  avatar?: string;
}
