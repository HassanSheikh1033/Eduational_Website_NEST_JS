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

  @IsNotEmpty()
  img: string; // Explicitly define as file object

  @IsArray()
  @ValidateNested({ each: true }) 
  @Type(() => SlideDto) 
  slides: SlideDto[];
}

