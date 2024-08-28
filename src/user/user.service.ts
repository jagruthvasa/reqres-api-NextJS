/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from '../shared/email.service';
import { RabbitMQService } from '../shared/rabbitmq.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private httpService: HttpService,
    private configService: ConfigService,
    private emailService: EmailService,
    private rabbitMQService: RabbitMQService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();

    // Send email
    await this.emailService.sendEmail(
      createdUser.name,
      'Welcome to our service!',
    );

    // Emit RabbitMQ event
    await this.rabbitMQService.emitEvent('user.created', createdUser);

    return createdUser;
  }

  async findOne(userId: string): Promise<any> {
    const baseUrl = this.configService.get<string>('reqres.baseUrl');
    const response = await firstValueFrom(
      this.httpService.get(`${baseUrl}/users/${userId}`),
    );
    return response.data;
  }
}
