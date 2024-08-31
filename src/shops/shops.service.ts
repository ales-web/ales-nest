import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UpdateShopDto, ReadShopDto, ReadShopsDto } from './dto';

@Injectable()
export class ShopsService {
  constructor(private prismaService: PrismaService) {}

  async getShop(id: number): Promise<ReadShopDto> {
    return await this.prismaService.shop.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        tags: true,
        logo: true,
        mainProductsLogo: true,
        promo: true,
        products: true,
        owner: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getShops(): Promise<ReadShopsDto[]> {
    return await this.prismaService.shop.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        tags: true,
        logo: true,
        mainProductsLogo: true,
        promo: true,
        products: true,
      },
    });
  }

  async createShop(userId: number, data: UpdateShopDto): Promise<ReadShopDto> {
    return await this.prismaService.shop.create({
      data: {
        ...data,
        owner: {
          connect: { id: userId },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        tags: true,
        logo: true,
        mainProductsLogo: true,
        promo: true,
        products: true,
        owner: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserShops(userId: number): Promise<ReadShopsDto[]> {
    return await this.prismaService.shop.findMany({
      where: { ownerId: userId },
      select: {
        id: true,
        name: true,
        description: true,
        tags: true,
        logo: true,
        mainProductsLogo: true,
        promo: true,
        products: true,
      },
    });
  }
}
