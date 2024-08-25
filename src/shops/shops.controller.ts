import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto, ReadShopDto, ReadShopsDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@auth/auth.guard';
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @ApiCreatedResponse({
    type: ReadShopDto,
  })
  @UsePipes(ValidationPipe)
  @Post('create')
  async create(
    @Body() body: CreateShopDto,
    @Req() request: Request,
  ): Promise<ReadShopDto> {
    return await this.shopsService.createShop(request['userId'], body);
  }

  @ApiOkResponse({ type: ReadShopDto })
  @ApiNotFoundResponse({ description: 'Shop not found' })
  @Get(':id')
  async getShop(@Param('id', ParseIntPipe) id: number): Promise<ReadShopDto> {
    const shop = await this.shopsService.getShop(id);
    if (!shop) throw new NotFoundException();
    return shop;
  }

  @UsePipes(ValidationPipe)
  @ApiOkResponse({ type: [ReadShopDto] })
  @Get()
  async getShops(): Promise<ReadShopsDto[]> {
    return await this.shopsService.getShops();
  }
}
