import { ApiProperty } from '@nestjs/swagger';
import {
  ProductCategories,
  ProductColors,
  ProductMaterials,
  ProductTag,
} from '@prisma/client';
import { ReadShopDto } from 'src/shops/dto';

export class ReadProductDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  images: string[];

  @ApiProperty({ enum: ProductTag, isArray: true })
  tags: ProductTag[];

  @ApiProperty()
  shopId: number;

  @ApiProperty({ enum: ProductMaterials, isArray: true })
  materials: ProductMaterials[];

  @ApiProperty({ enum: ProductColors, isArray: true })
  colors: ProductColors[];

  @ApiProperty()
  size: number;

  @ApiProperty({ enum: ProductCategories, isArray: true })
  categories: ProductCategories[];

  @ApiProperty()
  OnStock: number;

  @ApiProperty()
  shop: ReadShopDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

// export type Product = {
//   id: number;
//   name: string;
//   images: string[]; //хэши картинок
//   price: string; // цена с валютой в строковом формате, прим. 20 000₽ - пока только рубли
//   description: string; // произвольное описание товара
//   materials: string[]; // enum материалов, прим. [сталь, кожа, стекло, нитки] - тут на подумать
//   colors: string[]; // доступные цвета товара, 1 товар - 1 цвет отражающий основной оттенок товара
//   size: string; // размер в см - возможно будем в 3 измерениях сохранять, высота, ширина, глубина
//   category: string; // enum заданных категорий, прим. Картина, кошелек, сумка и тд.
//   tags: string[]; // enum либо произвольные теги пользователя - на подумать
//   onStock: number; // количество в наличии

//   country: string; // по дефолту ставим всем Грузия
//   city: string; // enum основных городов Грузии, пока всем ставим Тбилиси

//   shop: {
//     id: number;
//     name: string;
//     logo: string;
//     rating: number;
//   };

//   createdAt: Date;
//   updatedAt: Date;
// };
