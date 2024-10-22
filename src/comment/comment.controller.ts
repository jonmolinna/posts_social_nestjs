import { Body, Controller, Delete, Param, Post, Request } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';
import { CreateCommentInputDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly postService: PostsService) {}

  @Post('addComment/:idPost')
  async addComment(
    @Param('idPost', ParseObjectIdPipe) id: ObjectId,
    @Request() req,
    @Body() commentDto: CreateCommentInputDto,
  ) {
    return this.postService.addComment({
      comment: commentDto.comment,
      post: id,
      user: req.user._id,
    });
  }

  @Delete('deleteComment/:idPost/:idComment')
  async deleteComment(
    @Param('idPost', ParseObjectIdPipe) idPost: ObjectId,
    @Param('idComment', ParseObjectIdPipe) idComment: ObjectId,
    @Request() req,
  ) {
    return this.postService.deleteComment({
      comment: idComment,
      post: idPost,
      user: req.user._id,
    });
  }
}
