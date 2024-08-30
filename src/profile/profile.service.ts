import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '@user/user.service';
import { ProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
  ) {}
  async getProfile(id: number): Promise<ProfileDto> {
    return await this.userService.findOneById(id);
  }

  async updateProfile(userId: number, data): Promise<ProfileDto> {
    return await this.userService.update(userId, data);
  }
}
