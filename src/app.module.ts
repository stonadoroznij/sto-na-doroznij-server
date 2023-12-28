import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { ServiceRequestModule } from './service-request/service-request.module';
import { ServicesModule } from './services/services.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CommonModule,
    ServiceRequestModule,
    ServicesModule,
    TelegramBotModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
