import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userInterface } from 'src/users/interface/user.interface';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { authInterface } from './interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, pass: string): Promise<authInterface | any> {
    const user: userInterface =
      await this.usersService.findOneUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);

      if (!isMatch) {
        throw new UnauthorizedException();
      }

      const payload = { _id: user._id, username: user.username };

      return {
        token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
