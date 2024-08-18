import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '@user/user.service';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { TokenDto } from './dto/token.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterDto): Promise<User> {
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser) throw new ConflictException('User already exists');
    const hashedPassword = this.hashPassword(user.password);
    user.password = hashedPassword;
    return await this.userService.save(user);
  }

  async logIn(email: string, password: string): Promise<TokenDto> {
    const user = await this.userService.findOneByEmail(email);
    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id };

    return this.issueNewToken(payload);
  }

  async logOut() {
    return null;
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }

  private async issueNewToken(payload: object) {
    const accessToken = await this.jwtService.signAsync(payload);
    const expDate = new Date();
    expDate.setHours(expDate.getHours() + 1);
    return {
      access_token: accessToken,
      exp: expDate,
    };
  }
}
