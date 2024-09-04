import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UpdateProductDto } from './dto';
import { ShopsService } from 'src/shops/shops.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(
    private prismaService: PrismaService,
    private shopsService: ShopsService,
  ) {}

  productSelect: Prisma.ProductSelect = {
    id: true,
    name: true,
    price: true,
    description: true,
    images: true,
    tags: true,
    materials: true,
    colors: true,
    category: true,
    size: true,
    inStock: true,
    createdAt: true,
    updatedAt: true,
    shop: {
      select: {
        id: true,
        name: true,
        logo: true,
        rating: true,
      },
    },
  };

  async createProduct(data: UpdateProductDto) {
    const shop = await this.shopsService.getShop(data.shopId);
    if (!shop) throw new NotFoundException();
    return await this.prismaService.product.create({
      data,
      select: this.productSelect,
    });
  }

  async getProduct(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: this.productSelect,
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  async getProducts() {
    return await this.prismaService.product.findMany({
      select: this.productSelect,
    });
  }

  async deleteProduct(id: number) {
    const product = await this.getProduct(id);
    if (!product) throw new NotFoundException();

    return await this.prismaService.product.delete({
      where: { id },
      select: this.productSelect,
    });
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    const product = await this.getProduct(id);
    if (!product) throw new NotFoundException();

    return await this.prismaService.product.update({
      where: { id },
      data,
      select: this.productSelect,
    });
  }

  async getShopProducts(id: number) {
    return await this.prismaService.product.findMany({
      where: { shopId: id },
      select: this.productSelect,
    });
  }
}
