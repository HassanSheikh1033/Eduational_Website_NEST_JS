import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

  // Create a new project
  async create(createProjectDto: CreateProjectDto): Promise<ProjectDocument> {
    try {
      const createdProject = new this.projectModel(createProjectDto);
      return await createdProject.save();
    } catch (error) {
      console.error('Error creating project:', error);
      throw new InternalServerErrorException('Failed to create project');
    }
  }

  // Get all projects
  async findAll(): Promise<ProjectDocument[]> {
    try {
      return await this.projectModel.find().exec();
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new InternalServerErrorException('Failed to fetch projects');
    }
  }

  // Get one project by ID
  async findOne(id: string): Promise<ProjectDocument> {
    try {
      const project = await this.projectModel.findById(id).exec();
      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      return project;
    } catch (error) {
      console.error('Error finding project:', error);
      throw new InternalServerErrorException('Failed to find project');
    }
  }

  // Update a project by ID
  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectDocument> {
    try {
      const project = await this.findOne(id);

      // Check if desc is set to "None" and handle it accordingly
      if (updateProjectDto.desc === "None") {
        updateProjectDto.desc = ''; // or set it to null based on your schema
      }

      Object.assign(project, updateProjectDto);
      return await project.save();
    } catch (error) {
      console.error('Error updating project:', error);
      throw new InternalServerErrorException('Failed to update project');
    }
  }




  // ProjectsService
  // Method to delete a project by ID
  async delete(id: string): Promise<void> {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    await this.projectModel.deleteOne({ _id: id });
  }

}
