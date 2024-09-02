import { ApiProperty } from '@nestjs/swagger';
import { Product, ShopTag } from '@prisma/client';
import { ReadUserDto } from '@user/dto';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsObject,
  IsString,
} from 'class-validator';

export class ReadShopDto {
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
  @IsArray()
  mainProductsLogo: string[];

  @ApiProperty({ default: false })
  @IsBoolean()
  promo: boolean;

  @ApiProperty()
  @IsArray()
  products: Product[];

  @ApiProperty()
  @IsObject()
  owner: ReadUserDto;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
