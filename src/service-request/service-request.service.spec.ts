import { Test, TestingModule } from '@nestjs/testing';
import { ServicesModule } from 'src/services/services.module';
import { TelegramBotModule } from 'src/telegram-bot/telegram-bot.module';
import { CommonModule } from 'src/common/common.module';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequestRepository } from './service-request.repo';

describe('ServiceRequestService', () => {
  let service: ServiceRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, ServicesModule, TelegramBotModule],
      providers: [ServiceRequestService, ServiceRequestRepository],
    }).compile();

    service = module.get<ServiceRequestService>(ServiceRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
