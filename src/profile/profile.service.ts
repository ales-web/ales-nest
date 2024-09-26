import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UpdateProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private userService: UsersService) {}

  private readonly args = {
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      avatar: true,
      firstName: true,
      lastName: true,
      description: true,
      phone: true,
      youtube: true,
      facebook: true,
      instagram: true,
      telegram: true,
      whatsapp: true,
      viber: true,
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

  async getProfile(id: number) {
    return await this.userService.findOneById(id, this.args);
  }

  async updateProfile(userId: number, data) {
    return await this.userService.update<UpdateProfileDto>(
      userId,
      data,
      this.args,
    );
  }
}
