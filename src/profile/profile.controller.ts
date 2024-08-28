import {
  Controller,
  Get,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UsePipes(ValidationPipe)
  @Get()
  async getProfile(@Req() request: Request) {
    const userId = request['userId'];
    return await this.profileService.getProfile(userId);
  }
}
