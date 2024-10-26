import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the Course interface
export interface Course {
  name: string;
  desc: string;
  img: string;
  slides: Array<{ title: string; file: string }>;
}


export type CourseDocument = Course & Document;

@Schema({ timestamps: true }) 
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  img: string;

  @Prop({ type: [{ title: String, file: String }] })
  slides: Array<{ title: string; file: string }>;

  @Prop({ default: Date.now })
  createdAt: Date; 
  
  @Prop({ default: Date.now })
  updatedAt: Date; 
}


export const CourseSchema = SchemaFactory.createForClass(Course);
