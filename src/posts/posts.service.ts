import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { CreatePostDto } from './dto/post.create.dto';
import { BookMarkDto } from 'src/bookmark/dto/bookMark.create.dto';
import { BookMark, BookMarkDocument } from 'src/schemas/bookmark.schema';
import { UsersService } from 'src/users/users.service';
import { Model, ObjectId } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(BookMark.name) private booKMark: Model<BookMark>,
    private usersService: UsersService,
  ) {}

  async addPost(createPostDto: CreatePostDto): Promise<Post> {
    return this.postModel.create(createPostDto);
  }

  async findOnePostById(id: ObjectId): Promise<Post | any> {
    return this.postModel
      .findById(id)
      .populate('user', '-password')
      .populate({ path: 'bookMarks.user', select: '-password' });
  }

  async addOrDeleteBookMark(dto: BookMarkDto) {
    const post: PostDocument = await this.postModel.findById(dto.post);
    if (!post) {
      throw new NotFoundException('No se encontro el post');
    }

    const book: BookMarkDocument = await this.booKMark.findOne({
      user: dto.user,
    });

    if (book) {
      const response = await this.booKMark.deleteOne({ user: book.user });
      if (response.acknowledged) {
        await this.postModel.findByIdAndUpdate(
          {
            _id: post._id,
          },
          {
            $pull: {
              bookMarks: {
                user: book.user,
              },
            },
          },
        );
        return {
          status: HttpStatus.OK,
          data: book,
        };
      }
    } else {
      const user: UserDocument = await this.usersService.findOneUserById(
        dto.user,
      );

      const bookMark = await this.booKMark.create({ user: user.id });
      post.bookMarks.push(bookMark);
      await post.save();
      const response = await bookMark.populate('user', '-password');
      return {
        status: HttpStatus.CREATED,
        data: response,
      };
    }
  }
}
