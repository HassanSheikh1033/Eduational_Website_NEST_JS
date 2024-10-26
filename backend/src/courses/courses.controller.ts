import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './course.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiResponse, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';


@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Create Course function
  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => (Math.round(Math.random() * 16)).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Only jpg, jpeg, png files are allowed!'), false);
        }
      },
    }),
    FilesInterceptor('slides', 10, {
      storage: diskStorage({
        destination: './uploads/slides',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => (Math.round(Math.random() * 16)).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
          cb(null, true);
        } else {
          cb(new Error('Only PDF files are allowed for slides!'), false);
        }
      },
    }),
  )
  @ApiOperation({ summary: 'Create a new course' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload an avatar image for the course and slides',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // For the avatar image upload
        },
        slides: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary', // For the slide file uploads (PDF)
          },
        },
        // Add any other properties from CreateCourseDto as needed
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Course created successfully', type: Course })
  @ApiResponse({ status: 400, description: 'Invalid input data or file upload error.' })
  async create(
    @UploadedFile() img: Express.Multer.File,
    @UploadedFiles() slides: Express.Multer.File[],
    @Body() createCourseDto: CreateCourseDto,
  ) {
    try {
      const imgPath = img.path;
      const slidePaths = slides.map((file) => file.path);

      console.log(imgPath, slidePaths);

      // Validate the DTO here if needed
      if (!createCourseDto || !Object.keys(createCourseDto).length) {
        throw new HttpException('Invalid input data.', HttpStatus.BAD_REQUEST);
      }

      return {
        imgPath,
        slidePaths,
      };

      // return await this.coursesService.create(createCourseDto, imgPath, slidePaths);
    } catch (error) {
      console.error('Error in create method:', error);
      throw new HttpException('Invalid input data or file upload error.', HttpStatus.BAD_REQUEST);
    }
  }



  // GET ALL Course function
  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved courses', type: [Course] })
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }




  // GET Course by id function
  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved course', type: Course })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async findOne(@Param('id') id: string): Promise<Course> {
    const course = await this.coursesService.findOne(id);
    return course;
  }




  
  // Update Course function
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Only jpg, jpeg, png files are allowed!'), false);
        }
      },
    }),
    FilesInterceptor('slides', 10, {
      storage: diskStorage({
        destination: './uploads/slides',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
          cb(null, true);
        } else {
          cb(new Error('Only PDF files are allowed for slides!'), false);
        }
      },
    }),
  )
  @ApiOperation({ summary: 'Update a course by ID' })
  @ApiResponse({ status: 200, description: 'Course updated successfully', type: Course })
  @ApiResponse({ status: 400, description: 'Invalid input data or file upload error.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile() img?: Express.Multer.File,
    @UploadedFiles() slides?: Express.Multer.File[],
  ): Promise<Course> {
    try {
      const imgPath = img ? img.path : undefined;
      const slidePaths = slides ? slides.map((file) => file.path) : undefined;

      return await this.coursesService.update(id, updateCourseDto, imgPath, slidePaths);
    } catch (error) {
      console.error('Error in update method:', error);
      throw new HttpException('Invalid input data or file upload error.', HttpStatus.BAD_REQUEST);
    }
  }
}
