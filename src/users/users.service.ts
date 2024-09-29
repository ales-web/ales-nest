import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UpdateUserDto, CreateUserDto } from './dto';
import { Prisma } from '@prisma/client';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async save(
    data: CreateUserDto,
    args?: Partial<Prisma.UserCreateArgs>,
  ): Promise<UserEntity> {
    return await this.prismaService.user.create({
      data,
      ...args,
    });
  }

  async findOneById(
    id: number,
    args?: Partial<Prisma.UserFindFirstArgs>,
  ): Promise<UserEntity> {
    return await this.prismaService.user.findFirst({
      where: { id },
      ...args,
    });
  }

  async findOneByEmail(
    email: string,
    args?: Partial<Prisma.UserFindFirstArgs>,
  ): Promise<UserEntity> {
    return await this.prismaService.user.findFirst({
      where: { email },
      ...args,
    });
  }

  async delete(id: number, args?: Partial<Prisma.UserDeleteArgs>) {
    return await this.prismaService.user.delete({
      where: { id },
      ...args,
    });
  }

  async update(
    id: number,
    data: UpdateUserDto,
    args?: Partial<Prisma.UserUpdateArgs>,
  ): Promise<UserEntity> {
    return await this.prismaService.user.update({
      where: { id },
      data,
      ...args,
    });
  }
}
