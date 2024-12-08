import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Course } from './course.schema';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';




@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  // Create Course function
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Course created successfully',
    type: Course,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data or file upload error.',
  })
  async create(
    @Body() createCourseDto: CreateCourseDto,
  ) {
    try {

      // Validate the DTO here if needed
      if (!createCourseDto || !Object.keys(createCourseDto).length) {
        throw new HttpException('Invalid input data.', HttpStatus.BAD_REQUEST);
      }

      return await this.coursesService.create(createCourseDto);
    } catch (error) {
      console.error('Error in create method:', error);
      throw new HttpException(
        'Invalid input data or file upload error.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }



  // GET ALL Course function
  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved courses',
    type: [Course],
  })
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }


  // GET Course by id function
  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved course',
    type: Course,
  })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async findOne(@Param('id') id: string): Promise<Course> {
    const course = await this.coursesService.findOne(id);
    return course;
  }



  // Update Course function
  @Patch(':id')
  @ApiOperation({ summary: 'Update a course by ID' })
  @ApiResponse({
    status: 200,
    description: 'Course updated successfully',
    type: Course,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    try {
      return await this.coursesService.update(id, updateCourseDto);
    } catch (error) {
      console.error('Error in update method:', error); // Log error for debugging
      throw new HttpException(
        error.message || 'Invalid input data.',
        error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST,
      );
    }
  }



  //?Tesing file system ==========================================
  @Post('test')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/testFiles',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Accept all file types for testing purposes
        cb(null, true);
      },
    }),
  )
  @ApiOperation({
    summary: 'Upload multiple files for testing and return file paths',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload multiple files under one field',
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary', // Allows multiple files upload
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Files uploaded successfully and paths returned',
  })
  @ApiResponse({ status: 400, description: 'File upload error' })
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<string[]> {
    try {
      // Get file paths
      const filePaths = files.map((file) => file.path);

      // Log paths for testing (optional)
      console.log('Uploaded file paths:', filePaths);

      return filePaths;
    } catch (error) {
      console.error('Error in uploadFiles method:', error);
      throw new HttpException('File upload error', HttpStatus.BAD_REQUEST);
    }
  }



  // Delete Course function
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course by ID' })
  @ApiResponse({ status: 204, description: 'Course deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.coursesService.delete(id);
    } catch (error) {
      console.error('Error in delete method:', error);
      throw new HttpException('Course not found.', HttpStatus.NOT_FOUND);
    }
  }
}








