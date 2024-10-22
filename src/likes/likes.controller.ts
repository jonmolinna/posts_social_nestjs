import { Controller, Param, Post, Request } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';

@Controller('likes')
export class LikesController {
  constructor(private postService: PostsService) {}

  @Post('addOrDelete/:idPost')
  async addOrDeleteLike(
    @Param('idPost', ParseObjectIdPipe) id: ObjectId,
    @Request() req,
  ) {
    return this.postService.addOrDeleteLike({
      post: id,
      user: req.user._id,
    });
  }
}
