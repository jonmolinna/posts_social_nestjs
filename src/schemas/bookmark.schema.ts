import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type BookMarkDocument = HydratedDocument<BookMark>;

@Schema()
export class BookMark {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookMarkSchema = SchemaFactory.createForClass(BookMark);
