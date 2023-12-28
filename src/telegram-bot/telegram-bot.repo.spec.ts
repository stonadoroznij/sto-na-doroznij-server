import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegramBotRepository } from './telegram-bot.repo';

describe('TelegramBotService', () => {
  let service: TelegramBotRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramBotRepository, PrismaService],
    }).compile();

    service = module.get<TelegramBotRepository>(TelegramBotRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
