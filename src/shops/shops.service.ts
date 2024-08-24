import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class ShopsService {
  constructor(private prismaService: PrismaService) {}

  async getShop(id: number) {
    return await this.prismaService.shop.findUnique({
      where: { id },
    });
  }

  async getShops() {
    return await this.prismaService.shop.findMany();
  }

  async createShop(data) {
    return await this.prismaService.shop.create({
      data,
    });
  }
}
