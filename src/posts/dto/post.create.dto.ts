import { ObjectId } from 'mongoose';

export class CreatePostInputDto {
  comment?: string;
  file: File;
}

export class CreatePostDto {
  imagen_url: string;
  imagen_id: string;
  comment?: string;
  user: ObjectId;
}

export class deletePostDto {
  user: ObjectId;
  post: ObjectId;
}
