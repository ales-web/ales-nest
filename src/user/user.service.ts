import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: Partial<User>): Promise<UserDto> {
    return await this.prismaService.user.create({
      data: {
        email: user.email,
        password: user.password,
      },
    });
  }

  async findOneById(id: number): Promise<UserDto> {
    return await this.prismaService.user.findFirst({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async delete(id: number): Promise<UserDto> {
    const existingUser = await this.findOneById(id);

    if (!existingUser) throw new NotFoundException();

    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
