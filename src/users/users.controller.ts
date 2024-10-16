import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      name: user.name,
      username: user.username,
      _id: user._id,
    };
  }
}
