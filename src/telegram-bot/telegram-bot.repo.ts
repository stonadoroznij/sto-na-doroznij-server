import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TelegramBotRepository {
  constructor(private prisma: PrismaService) {}

  async add(data: { chatId: string }) {
    return await this.prisma.telegramChat.create({
      data,
    });
  }

  async deleteById(chatId: string) {
    return await this.prisma.telegramChat.delete({
      where: {
        chatId,
      },
    });
  }

  async getById(chatId: string) {
    return await this.prisma.telegramChat.findUnique({
      where: {
        chatId,
      },
    });
  }

  async getAll() {
    return await this.prisma.telegramChat.findMany({
      select: {
        chatId: true,
      },
    });
  }
}
