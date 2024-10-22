import { ObjectId } from 'mongoose';

export class LikeDto {
  post: ObjectId;
  user: ObjectId;
}
