import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UpdateProfileDto } from './dto';
import { ProfileEntity } from './entities';

@Injectable()
export class ProfileService {
  constructor(private userService: UsersService) {}

  private readonly args = {
    include: {
      shops: {
        select: {
          id: true,
          name: true,
          logo: true,
          rating: true,
        },
      },
    },
  };

  async getProfile(id: number): Promise<ProfileEntity> {
    return await this.userService.findOneById(id, this.args);
  }

  async updateProfile(
    userId: number,
    data: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    return await this.userService.update(userId, data, this.args);
  }
}
