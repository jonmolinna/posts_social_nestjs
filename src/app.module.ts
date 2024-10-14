import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jmolina2624:FwqJqfE6dL4zo6Eg@cluster0.h8rkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
    AuthModule,
    PostsModule,
    CloudinaryModule,
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
