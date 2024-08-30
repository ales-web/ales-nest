import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from '@user/user.service';
import { TokenDto, RegisterDto, LoginDto, SessionDto } from './dto';
import { hash, verify } from 'argon2';
import { ProfileService } from 'src/profile/profile.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private profileService: ProfileService,
  ) {}

  async register(user: RegisterDto): Promise<SessionDto> {
    const existingUser = await this.userService.findOneByEmail(user.email);

    if (existingUser) throw new ConflictException('User already exists');

    const hashedPassword = await this.hashPassword(user.password);
    user.password = hashedPassword;
    const newUser = await this.userService.save(user);
    const profile = await this.profileService.getProfile(newUser.id);
    return { ...(await this.issueNewTokens({ userId: newUser.id })), profile };
  }

  async logIn(email: string, password: string): Promise<SessionDto> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    if (!(await verify(user.password, password))) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id };

    const profile = await this.profileService.getProfile(user.id);
    return {
      ...(await this.issueNewTokens(payload)),
      profile,
    };
  }

  async logOut() {
    return null;
  }

  async refresh(token: string): Promise<SessionDto> {
    try {
      const isValid = await this.jwtService.verifyAsync(token);
      const tokenData = await this.jwtService.decode(token);

      if (!isValid || tokenData.type !== 'refresh') {
        throw new UnauthorizedException();
      }
      const profile = await this.profileService.getProfile(tokenData.userId);
      return {
        ...(await this.issueNewTokens({ userId: tokenData.userId })),
        profile,
      };
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
