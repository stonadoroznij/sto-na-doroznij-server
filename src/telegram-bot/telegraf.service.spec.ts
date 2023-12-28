import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { TelegrafService } from './telegraf.service';
import { TelegramBotRepository } from './telegram-bot.repo';

describe('TelegramService', () => {
  let service: TelegrafService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [ConfigService, TelegrafService, TelegramBotRepository],
    }).compile();

    service = module.get<TelegrafService>(TelegrafService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
