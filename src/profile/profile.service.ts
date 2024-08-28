import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '@user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
  ) {}
  async getProfile(id: number) {
    return this.userService.findOneById(id);
  }

  async updateProfile(userId: number, data) {
    return await this.userService.update(userId, data);
  }
}
