import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UsersModule } from 'src/users/users.module';
import { PostSchema, Post } from 'src/schemas/post.schema';
import { BookMark, BookMarkSchema } from 'src/schemas/bookmark.schema';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Like, LikeSchema } from 'src/schemas/like.schema';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: BookMark.name, schema: BookMarkSchema },
      { name: Comment.name, schema: CommentSchema },
      {
        name: Like.name,
        schema: LikeSchema,
      },
    ]),
    CloudinaryModule,
    UsersModule,
  ],
  exports: [PostsService],
})
export class PostsModule {}
