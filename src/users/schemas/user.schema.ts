import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, select: false }) // 'select: false' to avoid returning password by default
  password: string; //save hashed password
}

export const UserSchema = SchemaFactory.createForClass(User);
