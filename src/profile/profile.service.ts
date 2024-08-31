import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ReadProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private userService: UsersService) {}
  async getProfile(id: number): Promise<ReadProfileDto> {
    return await this.userService.findOneById(id);
  }

  async updateProfile(userId: number, data): Promise<ReadProfileDto> {
    return await this.userService.update(userId, data);
  }
}
