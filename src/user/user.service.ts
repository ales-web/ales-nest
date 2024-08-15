import { Injectable, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { genSalt, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly PrismaService: PrismaService) {}

  save(user: Partial<User>) {
    const hashedPassword = this.hashPassword(user.password);
    return this.PrismaService.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        roles: ['USER'],
      },
    });
  }

  findOne(idOrEmail: string) {
    return this.PrismaService.user.findFirst({
      where: {
        OR: [{ id: idOrEmail }, { email: idOrEmail }],
      },
    });
  }

  delete(id) {
    return this.PrismaService.user.delete({
      where: { id },
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
