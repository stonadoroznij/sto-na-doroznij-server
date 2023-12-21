import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TelegramBotService {
  constructor(private prisma: PrismaService) {}

  public async add(data: { chatId: string }) {
    return await this.prisma.telegramChat.create({
      data,
    });
  }

  public async deleteById(chatId: string) {
    return await this.prisma.telegramChat.delete({
      where: {
        chatId,
      },
    });
  }

  public async getById(chatId: string) {
    return await this.prisma.telegramChat.findUnique({
      where: {
        chatId,
      },
    });
  }

  public async getAll() {
    return await this.prisma.telegramChat.findMany({
      select: {
        chatId: true,
      },
    });
  }
}
