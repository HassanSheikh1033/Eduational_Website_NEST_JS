import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';



@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) { }

  
  // Create Course  ================================ 
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




  // Get all courses ============================= 
  async findAll(): Promise<CourseDocument[]> {
    try {
      return await this.courseModel.find().exec();
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new InternalServerErrorException('Failed to fetch courses');
    }
  }




  // Get one course by ID ================== 
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




  // Update the courses  ============
  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseDocument> {
    try {
      const course = await this.findOne(id);
      if (!course) {
        throw new NotFoundException(`Course with ID ${id} not found.`);
      }

      console.log('Existing course:', course);
      console.log('Update data:', updateCourseDto);

      Object.assign(course, updateCourseDto);

      course.updatedAt = new Date();

      return await course.save();
    } catch (error) {
      console.error('Error updating course:', error);
      throw new InternalServerErrorException('Failed to update course');
    }
  }


 


  // Delete a course by ID
  async delete(id: string): Promise<void> {
    const result = await this.courseModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
  }
}






