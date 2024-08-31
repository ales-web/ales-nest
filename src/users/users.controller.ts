import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@auth/auth.guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReadUserDto } from './dto/read-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get user' })
  @ApiOkResponse({
    type: ReadUserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Get(':id')
  async findOneUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadUserDto> {
    const user = await this.userService.findOneById(id);

    if (!user) throw new NotFoundException();

    return user;
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({
    type: ReadUserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadUserDto> {
    const user = await this.userService.findOneById(id);

    if (!user) throw new NotFoundException();

    return await this.userService.delete(id);
  }
}
