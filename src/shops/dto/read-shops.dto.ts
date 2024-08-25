import { ApiProperty } from '@nestjs/swagger';
import { ShopTag } from '@prisma/client';
import { IsArray, IsBoolean, IsEnum, IsString } from 'class-validator';

export class ReadShopsDto {
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
  products: string[];
}
