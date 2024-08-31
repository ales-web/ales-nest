import { IsArray, IsBoolean, IsEnum, IsString } from 'class-validator';
import { ShopTag } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShopDto {
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
}
