import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { TelegramBotModule } from 'src/telegram-bot/telegram-bot.module';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequestController } from './service-request.controller';
import { ServiceRequestRepository } from './service-request.repo';

@Module({
  imports: [ServicesModule, TelegramBotModule],
  controllers: [ServiceRequestController],
  providers: [ServiceRequestService, ServiceRequestRepository],
})
export class ServiceRequestModule {}
