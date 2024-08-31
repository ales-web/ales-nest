import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UpdateProductDto } from './dto';
import { ShopsService } from 'src/shops/shops.service';

@Injectable()
export class ProductsService {
  constructor(
    private prismaService: PrismaService,
    private shopsService: ShopsService,
  ) {}

  async createProduct(data: UpdateProductDto) {
    const shop = await this.shopsService.getShop(data.shopId);
    if (!shop) throw new NotFoundException();
    return await this.prismaService.product.create({
      data,
    });
  }

  async getProduct(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  async getProducts() {
    return await this.prismaService.product.findMany();
  }

  async deleteProduct(id: number) {
    const product = await this.getProduct(id);
    if (!product) throw new NotFoundException();

    return await this.prismaService.product.delete({
      where: { id },
    });
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    const product = await this.getProduct(id);
    if (!product) throw new NotFoundException();

    return await this.prismaService.product.update({
      where: { id },
      data,
    });
  }

  async getShopProducts(id: number) {
    return await this.prismaService.product.findMany({
      where: { shopId: id },
    });
  }
}
