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
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@auth/auth.guard';
import { UserService } from '@user/user.service';
import { Public } from 'src/decorators/public.decorator';
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Shops')
@Controller('shops')
export class ShopsController {
  constructor(
    private readonly shopsService: ShopsService,
    private userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Create shop' })
  @ApiCreatedResponse({
    type: ReadShopDto,
  })
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() body: CreateShopDto,
    @Req() request: Request,
  ): Promise<ReadShopDto> {
    return await this.shopsService.createShop(request['userId'], body);
  }

  @ApiOperation({ summary: 'Get shop' })
  @ApiOkResponse({ type: ReadShopDto })
  @ApiNotFoundResponse({ description: 'Shop not found' })
  @Get(':id')
  async getShop(@Param('id', ParseIntPipe) id: number): Promise<ReadShopDto> {
    const shop = await this.shopsService.getShop(id);
    if (!shop) throw new NotFoundException();
    return shop;
  }

  @ApiOperation({ summary: 'Get shops' })
  @UsePipes(ValidationPipe)
  @ApiOkResponse({ type: [ReadShopDto] })
  @Public()
  @Get()
  async getShops(): Promise<ReadShopsDto[]> {
    return await this.shopsService.getShops();
  }

  @ApiOperation({ summary: 'Get users shops' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({ type: [ReadShopsDto] })
  @Get('user/:id')
  async getUserShops(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadShopsDto[]> {
    if (!(await this.userService.findOneById(id))) {
      throw new NotFoundException();
    }
    return await this.shopsService.getUserShops(id);
  }
}
