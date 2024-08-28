/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendEmail(to: string, content: string): Promise<void> {
    // This is a dummy implementation
    console.log(`Sending email to ${to}: ${content}`);
  }
}