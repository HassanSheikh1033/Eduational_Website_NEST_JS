import { Controller, Get, Post, Patch, Param, Body, HttpException, HttpStatus,
   UseInterceptors, UploadedFile, Delete, HttpCode, NotFoundException  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.schema';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  // File upload storage configuration
  private static storageOptions = diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });


  // Create a project with image upload
  @Post()
  @UseInterceptors(
    FileInterceptor('img', { storage: ProjectsController.storageOptions })
  )
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project created successfully', type: Project })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    try {
      if (file) {
        createProjectDto.img = file.path;
      }
      return await this.projectsService.create(createProjectDto);
    } catch (error) {
      console.error('Error in create method:', error);
      throw new HttpException('Invalid input data.', HttpStatus.BAD_REQUEST);
    }
  }


  // Get all projects
  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved projects', type: [Project] })
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }


  // Get a project by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved project', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }


  
  // Update a project by ID with image upload
  @Patch(':id')
  @UseInterceptors(FileInterceptor('img', { storage: ProjectsController.storageOptions }))
  @ApiOperation({ summary: 'Update a project by ID' })
  @ApiResponse({ status: 200, description: 'Project updated successfully', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async update(
    @Param('id') id: string, 
    @UploadedFile() file: Express.Multer.File, 
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    try {
      // If a new image is uploaded, update the image path
      if (file) {
        updateProjectDto.img = file.path; // Update the img field with the new file path
      }

      return await this.projectsService.update(id, updateProjectDto);
    } catch (error) {
      console.error('Error in update method:', error);
      throw new HttpException('Invalid input data.', HttpStatus.BAD_REQUEST);
    }
  }


  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a project by ID' })
  @ApiResponse({ status: 204, description: 'Project deleted successfully' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.projectsService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Unable to delete project.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
}


