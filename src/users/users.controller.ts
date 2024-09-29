import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@auth/auth.guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get user' })
  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Get(':id')
  async findOneUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserEntity> {
    const user = await this.userService.findOneById(id);

    if (!user) throw new NotFoundException();

    return user;
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    const user = await this.userService.findOneById(id);

    if (!user) throw new NotFoundException();

    return await this.userService.delete(id);
  }
}
