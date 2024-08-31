import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ReadUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async save(data: UpdateUserDto): Promise<ReadUserDto> {
    return await this.prismaService.user.create({
      data,
    });
  }

  async findOneById(id: number): Promise<ReadUserDto> {
    return await this.prismaService.user.findFirst({
      where: { id },
      omit: { password: true },
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

  async update(id: number, data: UpdateUserDto): Promise<ReadUserDto> {
    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }
}
