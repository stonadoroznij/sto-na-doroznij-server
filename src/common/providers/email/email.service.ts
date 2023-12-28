import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import { EmailData } from './email.types';

@Injectable()
export class EmailService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger('EmailService');

  private isInitialized: boolean = false;
  private transporter: Transporter;
  private user: string;

  constructor(private configService: ConfigService) {}

  onApplicationBootstrap() {
    this.logger.log('Init email transporter');

    if (this.isInitialized) {
      this.logger.warn('Email transporter already initialized');
      return;
    }

    const mailHost = this.configService.getOrThrow<string>('MAIL_HOST');
    const mailPort = this.configService.getOrThrow<string>('MAIL_PORT');
    const mailUser = this.configService.getOrThrow<string>('MAIL_USER');
    const mailPassword = this.configService.getOrThrow<string>('MAIL_PASSWORD');

    this.transporter = createTransport({
      host: mailHost,
      port: Number(mailPort),
      secure: true,
      auth: {
        user: mailUser,
        pass: mailPassword,
      },
    });

    this.user = mailUser;

    this.isInitialized = true;
    this.logger.log('Email transporter launched');
  }

  onApplicationShutdown() {
    if (!this.isInitialized) {
      this.logger.warn('Email transporter already stopped');
      return;
    }

    this.transporter.close();
    this.logger.log('Email transporter closed');
  }

  async sendMessage(emailData: EmailData, recipient: string) {
    return await this.transporter.sendMail({
      from: `STO na Doroznij ${this.user}`,
      to: recipient,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    });
  }

  async sendMessageToAdmin(emailData: EmailData) {
    const admin = this.user;

    this.sendMessage(emailData, admin);
  }
}
