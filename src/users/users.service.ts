import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ReadUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async save(data: UpdateUserDto): Promise<ReadUserDto> {
    return await this.prismaService.user.create({
      data,
    });
  }

  async findOneById(id: number, params?: Partial<Prisma.UserFindFirstArgs>) {
    return await this.prismaService.user.findFirst({
      where: { id },
      ...params,
    });
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async delete(id: number): Promise<ReadUserDto> {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }

  async update<T>(id: number, data: T, params: Partial<Prisma.UserUpdateArgs>) {
    return await this.prismaService.user.update({
      where: { id },
      data,
      ...params,
    });
  }
}

// select: {
//   id: true,
//   email: true,
//   createdAt: true,
//   updatedAt: true,
//   shops: true,
// },
