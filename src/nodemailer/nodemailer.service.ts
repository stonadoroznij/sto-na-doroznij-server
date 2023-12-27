import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { EmailData } from 'src/types';

@Injectable()
export class NodemailerService implements OnApplicationBootstrap {
  private transporter: Transporter;
  private adminEmail: string;
  private readonly logger = new Logger('NodemailerService');
  constructor(private configService: ConfigService) {}

  onApplicationBootstrap() {
    this.logger.log('Init Nodemailer module');
    const mailHost = this.configService.getOrThrow<string>('MAIL_HOST');
    const mailPort = this.configService.getOrThrow<number>('MAIL_PORT');
    const mailUser = this.configService.getOrThrow<string>('MAIL_USER');
    const mailPassword = this.configService.getOrThrow<string>('MAIL_PASSWORD');

    this.transporter = createTransport({
      host: mailHost,
      port: mailPort,
      secure: true,
      auth: {
        user: mailUser,
        pass: mailPassword,
      },
    });

    this.adminEmail = mailUser;
  }

  public async sendMessage(emailData: EmailData, recipient: string) {
    return await this.transporter.sendMail({
      from: `STO na Doroznij ${this.adminEmail}`,
      to: recipient,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    });
  }

  public async sendMessageToAdmin(emailData: EmailData) {
    const admin = this.adminEmail;

    this.sendMessage(emailData, admin);
  }
}
