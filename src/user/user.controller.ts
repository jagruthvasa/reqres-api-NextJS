/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }
}