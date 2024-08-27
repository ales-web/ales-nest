import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from '@user/user.service';
import { TokenDto, RegisterDto, LoginDto } from './dto';
import { hash, verify } from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterDto): Promise<User> {
    const existingUser = await this.userService.findOneByEmail(user.email);

    if (existingUser) throw new ConflictException('User already exists');

    const hashedPassword = await this.hashPassword(user.password);
    user.password = hashedPassword;
    return await this.userService.save(user);
  }

  async logIn(email: string, password: string): Promise<LoginDto> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    if (!(await verify(user.password, password))) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id };

    return {
      ...(await this.issueNewTokens(payload)),
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };
  }

  async logOut() {
    return null;
  }

  async refresh(token: string): Promise<TokenDto> {
    try {
      const isValid = await this.jwtService.verifyAsync(token);
      const tokenData = await this.jwtService.decode(token);
      if (!isValid || tokenData.type !== 'refresh') {
        throw new UnauthorizedException();
      }
      return this.issueNewTokens({ userId: tokenData.userId });
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async hashPassword(password: string) {
    return await hash(password);
  }

  private async issueNewTokens(payload: object) {
    const accessToken = await this.jwtService.signAsync({
      ...payload,
      type: 'access',
    });
    const refreshToken = await this.jwtService.signAsync(
      { ...payload, type: 'refresh' },
      {
        expiresIn: '90d',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
