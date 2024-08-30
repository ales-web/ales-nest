import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '@user/dto/update-user.dto';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'Get profile' })
  @UsePipes(ValidationPipe)
  @Get()
  async getProfile(@Req() request: Request) {
    const userId = request['userId'];
    return await this.profileService.getProfile(userId);
  }

  @ApiOperation({ summary: 'Update profile' })
  @UsePipes(ValidationPipe)
  @Put()
  async updateProfile(@Req() request: Request, @Body() data: UpdateUserDto) {
    const userId = request['userId'];
    return await this.profileService.updateProfile(userId, data);
  }
}
