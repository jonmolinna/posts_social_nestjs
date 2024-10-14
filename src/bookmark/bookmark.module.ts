import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [BookmarkController],
  providers: [],
  imports: [PostsModule, UsersModule],
})
export class BookmarkModule {}
