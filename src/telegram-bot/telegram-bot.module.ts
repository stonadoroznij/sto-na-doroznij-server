import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramBotRepository } from './telegram-bot.repo';
import { TelegrafService } from './telegraf.service';

@Module({
  imports: [ConfigModule],
  providers: [TelegrafService, TelegramBotRepository],
  exports: [TelegrafService, TelegramBotRepository],
})
export class TelegramBotModule {}
