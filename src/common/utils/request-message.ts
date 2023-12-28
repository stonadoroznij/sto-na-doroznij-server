import { Request } from '@prisma/client';
import { TelegramBot } from 'src/i18n/uk';
import { MessageConfig, MessageData, MessageFormat } from 'src/types';

export class RequestMessage {
  private readonly NA_STRING = '---';

  private readonly config: Record<MessageFormat, MessageConfig> = {
    html: {
      rBold: '<b>',
      lBold: '</b>',
      newLine: '<br/>',
    },
    markdown: {
      rBold: '*',
      lBold: '*',
      newLine: '',
    },
    text: {
      rBold: '',
      lBold: '',
      newLine: '',
    },
  };

  constructor(
    private readonly requestData: Request,
    private readonly services: string[],
  ) {}

  markdown() {
    const messageData = this.dataToSrt();
    const services = this.servicesToStr();
    const config = this.config.markdown;

    return TelegramBot.requestTemplate(messageData, services, config);
  }

  html() {
    const messageData = this.dataToSrt();
    const services = this.servicesToStr();
    const config = this.config.html;

    return TelegramBot.requestTemplate(messageData, services, config);
  }

  text() {
    const messageData = this.dataToSrt();
    const services = this.servicesToStr();
    const config = this.config.text;

    return TelegramBot.requestTemplate(messageData, services, config);
  }

  private dataToSrt(): MessageData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...restData } = this.requestData;
    const keys = Object.keys(restData) as (keyof Omit<Request, 'id'>)[];

    return keys.reduce<MessageData>((acc, key) => {
      const value = restData[key];
      acc[key] = value || this.NA_STRING;

      return acc;
    }, {} as MessageData);
  }

  private servicesToStr() {
    return this.services.join(', ') || this.NA_STRING;
  }
}
