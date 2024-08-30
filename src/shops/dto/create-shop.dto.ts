import { IsArray, IsBoolean, IsEnum, IsString } from 'class-validator';
import { Product, ShopTag } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

// enum ShopTag {
//   ARTS,
//   BAGS,
//   TOYS,
//   TEXTILE,
//   DISHES,
//   GIFTS,
//   INSTRUMENTS,
//   SUBCULTURE,
//   ZOO,
//   ACCESSORIES,
// }

export class CreateShopDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({
    enum: ShopTag,
    isArray: true,
  })
  @IsArray()
  @IsEnum(ShopTag, { each: true })
  tags: ShopTag[];

  @ApiProperty()
  @IsString()
  logo: string;

  @ApiProperty()
  @IsString({ each: true })
  mainProductsLogo: string[];

  @ApiProperty({ default: false })
  @IsBoolean()
  promo: boolean;

  // @ApiProperty()
  // @IsArray()
  // @IsString({ each: true })
  // products: Product[];
}
