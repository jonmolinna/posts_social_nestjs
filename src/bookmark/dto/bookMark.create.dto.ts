import { ObjectId } from 'mongoose';

export class BookMarkDto {
  post: ObjectId;
  user: ObjectId;
}
