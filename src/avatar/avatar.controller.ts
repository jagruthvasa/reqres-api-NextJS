/* eslint-disable prettier/prettier */
import { Controller, Get, Delete, Param } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Controller('api/user')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get(':userId/avatar')
  async getAvatar(@Param('userId') userId: string) {
    return this.avatarService.getAvatar(userId);
  }

  @Delete(':userId/avatar')
  async deleteAvatar(@Param('userId') userId: string) {
    return this.avatarService.deleteAvatar(userId);
  }
}