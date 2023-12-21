import { timingSafeEqual } from 'node:crypto';
import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { ConfigService } from '@nestjs/config';
import { TelegramBot } from 'src/i18n/uk';
import { TelegramBotService } from 'src/telegram-bot/telegram-bot.service';

@Injectable()
export class TelegrafService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger('TelegrafService');

  private isInitialized: boolean = false;
  private bot: Telegraf;
  private token: string;
  private password: string;

  constructor(
    private configService: ConfigService,
    private telegramBotService: TelegramBotService,
  ) {}

  onApplicationBootstrap() {
    this.logger.log('Init Telegram module');

    if (this.isInitialized) {
      this.logger.warn('Telegram bot already launched');
      return;
    }

    const token = this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');

    const password = this.configService.getOrThrow<string>(
      'TELEGRAM_BOT_PASSWORD',
    );

    this.token = token;
    this.password = password;

    this.bot = new Telegraf(this.token);

    this.setup();
    this.start();
  }

  onApplicationShutdown(signal?: string) {
    if (!this.isInitialized) {
      this.logger.warn('Telegram bot already stopped');
      return;
    }

    this.bot.stop(signal);
    this.logger.log('Telegram bot stopped');
  }

  private setup() {
    const isSubscribing: Set<number> = new Set();
    const password = this.password;
    const bot = this.bot;

    bot.start((ctx) => {
      ctx.reply(TelegramBot.startMessage);
    });

    bot.command('join', async (ctx) => {
      const { chat } = ctx.message;
      const chatId = chat.id.toString();
      const isChatExist = await this.telegramBotService.getById(chatId);

      if (isChatExist) {
        ctx.reply(TelegramBot.alreadySubscribed);
        return;
      }

      if (!isSubscribing.has(chat.id)) {
        isSubscribing.add(chat.id);
      }

      ctx.reply(TelegramBot.writePassword);
    });

    bot.command('leave', async (ctx) => {
      const chatId = ctx.message.chat.id.toString();
      const isChatExist = await this.telegramBotService.getById(chatId);

      if (!isChatExist) {
        ctx.reply(TelegramBot.notSubscribed);
        return;
      }

      await this.telegramBotService.deleteById(chatId);

      ctx.reply(TelegramBot.unsubscribe);
    });

    bot.on(message('text'), async (ctx) => {
      const { text, chat } = ctx.update.message;

      if (!isSubscribing.has(chat.id)) return;

      if (timingSafeEqual(Buffer.from(text), Buffer.from(password))) {
        const chatId = chat.id.toString();

        await this.telegramBotService.add({
          chatId: chatId,
        });

        ctx.reply(TelegramBot.subscribe);
        isSubscribing.delete(chat.id);

        return;
      }

      ctx.reply(TelegramBot.wrongPassword);
    });

    bot.on('my_chat_member', async (ctx) => {
      const { my_chat_member } = ctx.update;
      const chatId = my_chat_member.chat.id.toString();

      if (my_chat_member.new_chat_member.status === 'kicked') {
        await this.telegramBotService.deleteById(chatId);
      }
    });
  }

  private async start() {
    this.logger.log('Launch Telegram bot');
    this.bot.launch();

    this.isInitialized = true;
    this.logger.log('Telegram bot launched');
  }

  public async sendMessage(text: string) {
    try {
      const chatList = await this.telegramBotService.getAll();
      const chatIdList = chatList.map((item) => item.chatId);

      return await Promise.allSettled(
        chatIdList.map((chatId) => {
          return this.bot.telegram.sendMessage(chatId, text, {
            parse_mode: 'Markdown',
          });
        }),
      );
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }
}
