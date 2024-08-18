import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // createUser(@Body() dto) {
  //   return this.userService.save(dto);
  // }
  @ApiOkResponse({
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Get(':idOrEmail')
  async findOneUser(@Param('idOrEmail') idOrEmail: string): Promise<UserDto> {
    return await this.userService.findOne(idOrEmail);
  }

  @ApiOkResponse({
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    const existingUser = await this.userService.findOne(id);
    if (!existingUser) throw new NotFoundException('User not found');
    return await this.userService.delete(id);
  }
}
