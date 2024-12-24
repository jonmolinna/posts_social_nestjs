import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { CreatePostDto } from './dto/post.create.dto';
import { BookMarkDto } from 'src/bookmark/dto/bookMark.create.dto';
import { BookMark, BookMarkDocument } from 'src/schemas/bookmark.schema';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { UsersService } from 'src/users/users.service';
import { Model, ObjectId } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { CommentDto, deleteCommentDto } from 'src/comment/dto/comment.dto';
import { LikeDto } from 'src/likes/dto/like.dto';
import { Like, LikeDocument } from 'src/schemas/like.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(BookMark.name) private booKMarkModel: Model<BookMark>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Like.name) private likeModel: Model<Like>,
    private usersService: UsersService,
  ) {}

  async addPost(createPostDto: CreatePostDto): Promise<Post> {
    return this.postModel.create(createPostDto);
  }

  async findOnePostById(id: ObjectId): Promise<Post | any> {
    return (
      this.postModel
        .findById(id)
        .populate('user', '-password')
        // .populate({ path: 'bookMarks.user', select: '-password' })
        .populate({ path: 'comments.user', select: '-password' })
    );
    // .populate({ path: 'likes.user', select: '-password' });
  }

  async allPosts(): Promise<PostDocument[]> {
    return await this.postModel
      .find()
      .populate('user', '-password')
      // .populate({ path: 'bookMarks.user', select: '-password' })
      .populate({ path: 'comments.user', select: '-password' })
      // .populate({ path: 'likes.user', select: '-password' })
      .sort({ createdAt: -1 });
  }

  async addOrDeleteBookMark(dto: BookMarkDto) {
    const post: PostDocument = await this.postModel.findById(dto.post);
    if (!post) {
      throw new NotFoundException('No se encontro el post');
    }

    const bookMark: BookMarkDocument = await this.booKMarkModel.findOne({
      user: dto.user,
      post: dto.post,
    });

    if (bookMark) {
      const response = await this.booKMarkModel.deleteOne({
        user: bookMark.user,
        post: bookMark.post,
      });
      if (response.deletedCount > 0) {
        await this.postModel.findByIdAndUpdate(
          {
            _id: post._id,
          },
          {
            $pull: {
              bookMarks: {
                user: bookMark.user,
              },
            },
          },
        );
        return bookMark;
      }
    } else {
      const user: UserDocument = await this.usersService.findOneUserById(
        dto.user,
      );

      const bookMark = await this.booKMarkModel.create({
        user: user.id,
        post: post.id,
      });

      post.bookMarks.push(bookMark);
      await post.save();

      return bookMark;
    }
  }

  async addComment(dto: CommentDto) {
    const post: PostDocument = await this.postModel.findById(dto.post);

    if (!post) {
      throw new NotFoundException('No se encontrol el post');
    }

    const user: UserDocument = await this.usersService.findOneUserById(
      dto.user,
    );

    const comment: CommentDocument = await this.commentModel.create({
      comment: dto.comment,
      user: user.id,
    });

    post.comments.push(comment);
    await post.save();

    const response = await comment.populate('user', '-password');
    return {
      status: HttpStatus.CREATED,
      data: response,
    };
  }

  async deleteComment(dto: deleteCommentDto) {
    const post: PostDocument = await this.postModel.findById(dto.post);

    if (!post) {
      throw new NotFoundException('No se encontro el post');
    }

    const comment: CommentDocument = await this.commentModel.findById(
      dto.comment,
    );

    if (!comment) {
      throw new NotFoundException('No se encontro el comentario');
    }

    const response = await this.commentModel.deleteOne({
      _id: dto.comment,
      user: dto.user,
    });

    if (response.deletedCount > 0) {
      await this.postModel.findOneAndUpdate(
        {
          _id: post._id,
        },
        {
          $pull: {
            comments: {
              _id: comment._id,
            },
          },
        },
      );

      return {
        status: HttpStatus.OK,
        data: comment,
      };
    }
  }

  async addOrDeleteLike(dto: LikeDto) {
    const post: PostDocument = await this.postModel.findById(dto.post);
    if (!post) {
      throw new NotFoundException('No se encontro el post');
    }

    const like: LikeDocument = await this.likeModel.findOne({
      user: dto.user,
      post: dto.post,
    });

    if (like) {
      const response = await this.likeModel.deleteOne({
        user: like.user,
        post: like.post,
      });
      if (response.deletedCount > 0) {
        await this.postModel.findByIdAndUpdate(
          {
            _id: post._id,
          },
          {
            $pull: {
              likes: {
                user: like.user,
              },
            },
          },
        );

        return like;
      }
    } else {
      const user: UserDocument = await this.usersService.findOneUserById(
        dto.user,
      );

      const like: LikeDocument = await this.likeModel.create({
        user: user.id,
        post: post.id,
      });

      post.likes.push(like);
      await post.save();

      return like;
    }
  }
}
