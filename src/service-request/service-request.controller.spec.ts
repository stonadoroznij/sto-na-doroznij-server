import { Test, TestingModule } from '@nestjs/testing';
import { ServicesModule } from 'src/services/services.module';
import { TelegramBotModule } from 'src/telegram-bot/telegram-bot.module';
import { CommonModule } from 'src/common/common.module';
import { ServiceRequestController } from './service-request.controller';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequestRepository } from './service-request.repo';

describe('ServiceRequestController', () => {
  let controller: ServiceRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, ServicesModule, TelegramBotModule],
      controllers: [ServiceRequestController],
      providers: [ServiceRequestService, ServiceRequestRepository],
    }).compile();

    controller = module.get<ServiceRequestController>(ServiceRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
