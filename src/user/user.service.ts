import { Injectable, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { genSalt, genSaltSync, hashSync } from 'bcrypt';
import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: Partial<User>): Promise<User> {
    const hashedPassword = this.hashPassword(user.password);
    return await this.prismaService.user.create({
      data: {
        email: user.email,
        password: user.password,
      },
    });
  }

  async findOneById(id: number) {
    return await this.prismaService.user.findFirst({
      where: { id },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async delete(id: number): Promise<User> {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
