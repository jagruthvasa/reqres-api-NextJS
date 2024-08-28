/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';
import { Avatar, AvatarSchema } from './schemas/avatar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Avatar.name, schema: AvatarSchema }]),
    HttpModule,
  ],
  controllers: [AvatarController],
  providers: [AvatarService],
})
export class AvatarModule {}