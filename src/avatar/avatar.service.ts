/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Avatar } from './schemas/avatar.schema';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AvatarService {
  constructor(
    @InjectModel(Avatar.name) private avatarModel: Model<Avatar>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getAvatar(userId: string): Promise<string> {
    let avatar = await this.avatarModel.findOne({ userId }).exec();

    if (!avatar) {
      const baseUrl = this.configService.get<string>('reqres.baseUrl');
      const userResponse = await firstValueFrom(
        this.httpService.get(`${baseUrl}/users/${userId}`)
      );
      const avatarUrl = userResponse.data.data.avatar;
      const imageResponse = await firstValueFrom(
        this.httpService.get(avatarUrl, { responseType: 'arraybuffer' })
      );
      const buffer = Buffer.from(imageResponse.data);
      const hash = crypto.createHash('md5').update(buffer).digest('hex');
      
      if (!fs.existsSync('./avatars')) {
        fs.mkdirSync('./avatars');
      }
      fs.writeFileSync(`./avatars/${hash}`, buffer);
      
      avatar = new this.avatarModel({ userId, hash });
      await avatar.save();
    }

    const fileContent = fs.readFileSync(`./avatars/${avatar.hash}`);
    return fileContent.toString('base64');
  }

  async deleteAvatar(userId: string): Promise<string> {
    const avatar = await this.avatarModel.findOne({ userId }).exec();
    if (!avatar) {
      throw new NotFoundException(`Avatar not found for user ${userId}`);
    }
    fs.unlinkSync(`./avatars/${avatar.hash}`);
    await this.avatarModel.deleteOne({ userId }).exec();
    return "Avatar Successfully Deleted";
  }
}