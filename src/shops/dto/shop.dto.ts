import { IsArray, IsString } from 'class-validator';

export class CreateShop {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  tags: ShopTag[];
}

enum ShopTag {
  ARTS,
  BAGS,
  TOYS,
  TEXTILE,
  DISHES,
  GIFTS,
  INSTRUMENTS,
  SUBCULTURE,
  ZOO,
  ACCESSORIES,
}
