import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  comment: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
