import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [CommentController],
  imports: [PostsModule],
})
export class CommentModule {}
