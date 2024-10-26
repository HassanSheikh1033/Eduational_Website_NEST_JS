import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';


@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  // Create a new course with file uploads for slides[] and img
  async create(createCourseDto: CreateCourseDto): Promise<CourseDocument> {
    const courseData = {
      ...createCourseDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const createdCourse = new this.courseModel(courseData);
      return await createdCourse.save();
    } catch (error) {
      console.error('Error creating course:', error);
      throw new InternalServerErrorException('Failed to create course');
    }
  }

  // Get all courses
  async findAll(): Promise<CourseDocument[]> {
    try {
      return await this.courseModel.find().exec();
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new InternalServerErrorException('Failed to fetch courses');
    }
  }

  // Get one course by ID
  async findOne(id: string): Promise<CourseDocument> {
    try {
      const course = await this.courseModel.findById(id).exec();
      if (!course) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
      return course;
    } catch (error) {
      console.error('Error finding course:', error);
      throw new InternalServerErrorException('Failed to find course');
    }
  }

  // Update a course by ID with file uploads for slides[] and img
  async update(id: string, updateCourseDto: UpdateCourseDto, imgPath?: string, slidePaths?: string[]): Promise<CourseDocument> {
    try {
      const course = await this.findOne(id);

      // Update the image and slides only if new files are provided
      if (imgPath) {
        course.img = imgPath;
      }
      if (slidePaths && slidePaths.length > 0) {
        course.slides = slidePaths.map((path) => ({ title: '', file: path }));
      }

      // Update other fields
      Object.assign(course, updateCourseDto);
      course.updatedAt = new Date(); // Explicitly update the updatedAt field

      return await course.save();
    } catch (error) {
      console.error('Error updating course:', error);
      throw new InternalServerErrorException('Failed to update course');
    }
  }
}
