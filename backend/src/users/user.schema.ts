import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string; 
}


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  avatar?: string;
}


export const UserSchema = SchemaFactory.createForClass(User);

