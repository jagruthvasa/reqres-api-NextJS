/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Avatar extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  hash: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);