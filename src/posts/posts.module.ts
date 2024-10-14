import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Post } from 'src/schemas/post.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { BookMark, BookMarkSchema } from 'src/schemas/bookmark.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([
      { name: BookMark.name, schema: BookMarkSchema },
    ]),
    CloudinaryModule,
    UsersModule,
  ],
  exports: [PostsService],
})
export class PostsModule {}
