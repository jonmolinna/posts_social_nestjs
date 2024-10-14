import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { BookMark, BookMarkSchema } from './bookmark.schema';
import { Like } from './like.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  imagen_url: string;

  @Prop()
  imagen_id: string;

  @Prop()
  comment: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop([BookMarkSchema])
  bookMarks: BookMark[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }] })
  likes: Like[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
