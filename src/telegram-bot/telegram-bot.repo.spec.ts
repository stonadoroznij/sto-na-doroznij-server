import { Test, TestingModule } from '@nestjs/testing';
import { CommonModule } from 'src/common/common.module';
import { TelegramBotRepository } from './telegram-bot.repo';

describe('TelegramBotService', () => {
  let service: TelegramBotRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [TelegramBotRepository],
    }).compile();

    service = module.get<TelegramBotRepository>(TelegramBotRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
