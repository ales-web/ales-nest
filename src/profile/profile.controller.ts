import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@auth/auth.guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateProfileDto } from './dto';
import { ProfileEntity } from './entities';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'Get profile' })
  @ApiOkResponse({ type: ProfileEntity })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  @UsePipes(ValidationPipe)
  @Get()
  async getProfile(@Req() request: Request): Promise<ProfileEntity> {
    const userId = request['userId'];
    const profile = await this.profileService.getProfile(userId);
    if (!profile) throw new NotFoundException();
    return profile;
  }

  @ApiOperation({ summary: 'Update profile' })
  @ApiOkResponse({ type: ProfileEntity })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  @UsePipes(ValidationPipe)
  @Put()
  async updateProfile(
    @Req() request: Request,
    @Body() data: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    const userId = request['userId'];
    const profile = await this.profileService.getProfile(userId);
    if (!profile) throw new NotFoundException();
    return await this.profileService.updateProfile(userId, data);
  }
}
