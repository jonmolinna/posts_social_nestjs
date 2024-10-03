import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileSizeValidationPipe } from './pipe/file.validate.pipe';
import { PostsService } from './posts.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePostInputDto } from './dto/post.create.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: PostsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
    @Body() createPostDto: CreatePostInputDto,
    @Request() req,
  ) {
    const image = await this.cloudinaryService.uploadFile(file);
    return await this.postService.addPost({
      user: req.user._id,
      comment: createPostDto.comment,
      imagen_url: image.secure_url,
      imagen_id: image.public_id,
    });
  }
}
