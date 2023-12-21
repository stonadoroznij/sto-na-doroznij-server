import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegrafService } from './telegraf.service';
import { TelegramBotService } from './telegram-bot.service';

describe('TelegramService', () => {
  let service: TelegrafService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        TelegrafService,
        TelegramBotService,
        PrismaService,
      ],
    }).compile();

    service = module.get<TelegrafService>(TelegrafService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
