import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegramBotService } from './telegram-bot.service';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegrafService } from './telegraf.service';

@Module({
  imports: [ConfigModule],
  controllers: [TelegramBotController],
  providers: [PrismaService, TelegrafService, TelegramBotService],
})
export class TelegramBotModule {}
