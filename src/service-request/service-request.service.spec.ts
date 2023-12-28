import { Test, TestingModule } from '@nestjs/testing';
import { ServicesModule } from 'src/services/services.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegramBotModule } from 'src/telegram-bot/telegram-bot.module';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequestRepository } from './service-request.repo';

describe('ServiceRequestService', () => {
  let service: ServiceRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServicesModule, TelegramBotModule],
      providers: [
        PrismaService,
        ServiceRequestService,
        ServiceRequestRepository,
      ],
    }).compile();

    service = module.get<ServiceRequestService>(ServiceRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
