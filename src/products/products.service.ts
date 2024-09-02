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
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        images: true,
        tags: true,
        materials: true,
        colors: true,
        categories: true,
        size: true,
        OnStock: true,
        createdAt: true,
        updatedAt: true,
        shopId: true,
        shop: {
          select: {
            id: true,
            name: true,
            description: true,
            tags: true,
            logo: true,
            mainProductsLogo: true,
            promo: true,
            products: true,
            owner: {
              omit: {
                password: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async getProduct(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        images: true,
        tags: true,
        materials: true,
        colors: true,
        categories: true,
        size: true,
        OnStock: true,
        createdAt: true,
        updatedAt: true,
        shopId: true,
        shop: {
          select: {
            id: true,
            name: true,
            description: true,
            tags: true,
            logo: true,
            mainProductsLogo: true,
            promo: true,
            products: true,
            owner: {
              omit: {
                password: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  async getProducts() {
    return await this.prismaService.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        images: true,
        tags: true,
        materials: true,
        colors: true,
        categories: true,
        size: true,
        OnStock: true,
        createdAt: true,
        updatedAt: true,
        shopId: true,
        shop: {
          select: {
            id: true,
            name: true,
            description: true,
            tags: true,
            logo: true,
            mainProductsLogo: true,
            promo: true,
            products: true,
            owner: {
              omit: {
                password: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async deleteProduct(id: number) {
    const product = await this.getProduct(id);
    if (!product) throw new NotFoundException();

    return await this.prismaService.product.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        images: true,
        tags: true,
        materials: true,
        colors: true,
        categories: true,
        size: true,
        OnStock: true,
        createdAt: true,
        updatedAt: true,
        shopId: true,
        shop: {
          select: {
            id: true,
            name: true,
            description: true,
            tags: true,
            logo: true,
            mainProductsLogo: true,
            promo: true,
            products: true,
            owner: {
              omit: {
                password: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    const product = await this.getProduct(id);
    if (!product) throw new NotFoundException();

    return await this.prismaService.product.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        images: true,
        tags: true,
        materials: true,
        colors: true,
        categories: true,
        size: true,
        OnStock: true,
        createdAt: true,
        updatedAt: true,
        shopId: true,
        shop: {
          select: {
            id: true,
            name: true,
            description: true,
            tags: true,
            logo: true,
            mainProductsLogo: true,
            promo: true,
            products: true,
            owner: {
              omit: {
                password: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async getShopProducts(id: number) {
    return await this.prismaService.product.findMany({
      where: { shopId: id },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        images: true,
        tags: true,
        materials: true,
        colors: true,
        categories: true,
        size: true,
        OnStock: true,
        createdAt: true,
        updatedAt: true,
        shopId: true,
        shop: {
          select: {
            id: true,
            name: true,
            description: true,
            tags: true,
            logo: true,
            mainProductsLogo: true,
            promo: true,
            products: true,
            owner: {
              omit: {
                password: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }
}
