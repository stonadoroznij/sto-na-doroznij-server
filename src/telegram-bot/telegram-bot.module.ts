import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegramBotRepository } from './telegram-bot.repo';
import { TelegrafService } from './telegraf.service';

@Module({
  imports: [ConfigModule],
  providers: [PrismaService, TelegrafService, TelegramBotRepository],
  exports: [TelegrafService, TelegramBotRepository],
})
export class TelegramBotModule {}
