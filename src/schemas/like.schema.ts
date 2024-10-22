import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type LikeDocument = HydratedDocument<Like>;

@Schema()
export class Like {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
