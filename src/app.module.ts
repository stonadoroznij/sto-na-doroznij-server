import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';

@Module({
  imports: [ConfigModule.forRoot(), TelegramBotModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
