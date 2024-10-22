import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCommentInputDto {
  @IsNotEmpty({ message: 'Ingrese un comentario' })
  comment: string;
}

export class CommentDto {
  comment: string;
  post: ObjectId;
  user: ObjectId;
}

export class deleteCommentDto {
  comment: ObjectId;
  user: ObjectId;
  post: ObjectId;
}
