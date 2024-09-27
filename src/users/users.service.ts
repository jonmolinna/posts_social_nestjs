import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/user.create.dto';
import * as bcrypt from 'bcrypt';
import { userInterface } from './interface/user.interface';

@Injectable()
export class UsersService {
  private saltOrRounds = 10;
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<userInterface> {
    const hash = await bcrypt.hash(createUserDto.password, this.saltOrRounds);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hash,
    });
    return createdUser.save();
  }

  async findOneUserByUsername(value: string): Promise<userInterface | any> {
    return await this.userModel.findOne({ username: value });
  }
}
