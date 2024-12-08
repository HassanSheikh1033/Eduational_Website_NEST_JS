import { IsArray, IsNotEmpty, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Slide DTO to represent individual slide details
class SlideDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  file: string; // The file path after upload
}

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsOptional()
  img?: string; 

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true }) 
  @Type(() => SlideDto) 
  slides?: SlideDto[];
}

