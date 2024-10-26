import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileuploadsService } from './fileuploads.service';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('fileuploads')
@ApiTags('File Uploads')
export class FileuploadsController {
  constructor(private readonly fileuploadsService: FileuploadsService) {}

  // Single File Upload
  @Post('single')
  @UseInterceptors(
    // Single file for image
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads/images',
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
  @ApiOperation({ summary: 'Upload a image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Upload an avatar image for the course and multiple slide files',
    required: true,
    schema: {
      type: 'object',
      properties: {
        img: {
          type: 'string',
          format: 'binary', // For the avatar image upload
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Course created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data or file upload error.',
  })
  async uploadSingleFile(@UploadedFile() img: Express.Multer.File) {
    try {
      const imgPath = img?.path;

      return {
        imgPath,
      };
    } catch (error) {
      console.error('Error in create method:', error);
      throw new HttpException(
        'Invalid input data or file upload error.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //? Multiple Files Upload===================================
  @Post('multiple')
  @UseInterceptors(
    // Multiple files for slides
    FilesInterceptor('slides', 10, {
      storage: diskStorage({
        destination: './uploads/slides',
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
  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload multiple files',
    required: true,
    schema: {
      type: 'object',
      properties: {
        slides: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary', // For multiple slides upload
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Multiple files uploaded successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data or file upload error.',
  })
  async uploadMultipleFiles(@UploadedFiles() slides: Express.Multer.File[]) {
    try {
      const slidePaths = slides.map((file) => file.path);
      return { slidePaths };
    } catch (error) {
      console.error('Error in create method:', error);
      throw new HttpException(
        'Invalid input data or file upload error.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
