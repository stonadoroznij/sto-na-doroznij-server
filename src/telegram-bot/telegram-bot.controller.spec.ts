import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './telegram-bot.service';

describe('TelegramBotController', () => {
  let controller: TelegramBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramBotController],
      providers: [TelegramBotService, PrismaService],
    }).compile();

    controller = module.get<TelegramBotController>(TelegramBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
