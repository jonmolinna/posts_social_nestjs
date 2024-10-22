import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [LikesController],
  imports: [PostsModule, UsersModule],
})
export class LikesModule {}
