import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);
    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
