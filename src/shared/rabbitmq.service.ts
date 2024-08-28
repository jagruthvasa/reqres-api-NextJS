/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    this.connection = await amqp.connect(this.configService.get<string>('rabbitmq.url'));
    this.channel = await this.connection.createChannel();
  }

  private async disconnect() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }

  async emitEvent(routingKey: string, message: any): Promise<void> {
    await this.channel.assertExchange('user_events', 'topic', { durable: false });
    this.channel.publish('user_events', routingKey, Buffer.from(JSON.stringify(message)));
  }
}