import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorator/public.decorator';
import { ObjectId } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      name: user.name,
      username: user.username,
      _id: user._id,
    };
  }

  @Get('/user/:username')
  async getUserByUsername(@Param('username') username: string) {
    const user: UserDocument =
      await this.usersService.findOneUserByUsername(username);

    if (user) {
      return {
        _id: user._id,
        name: user.name,
        username: user.username,
        createdAt: user.createdAt,
      };
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      },
      HttpStatus.NOT_FOUND,
      {
        cause: 'error',
      },
    );
  }

  @Get('/profile')
  async getUser(@Request() req) {
    const idUser: ObjectId = req.user._id;
    const user: UserDocument = await this.usersService.findOneUserById(idUser);
    return {
      _id: user._id,
      name: user.name,
      username: user.username,
      createdAt: user.createdAt,
    };
  }
}
