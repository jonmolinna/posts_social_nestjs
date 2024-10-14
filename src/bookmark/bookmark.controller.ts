import { Controller, Param, Post, Request } from '@nestjs/common';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';
import { ObjectId } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private postService: PostsService) {}

  @Post('addOrDelete/:idPost')
  async addBookMark(
    @Param('idPost', ParseObjectIdPipe) id: ObjectId,
    @Request() req,
  ) {
    return this.postService.addOrDeleteBookMark({
      post: id,
      user: req.user._id,
    });
  }
}
