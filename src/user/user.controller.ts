import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@auth/auth.guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Get('id/:id')
  async findOneUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserDto> {
    const user = await this.userService.findOneById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @ApiOkResponse({
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return await this.userService.delete(id);
  }
}
