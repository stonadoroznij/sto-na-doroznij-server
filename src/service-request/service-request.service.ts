import { Injectable, Logger } from '@nestjs/common';
import { ServicesRepository } from 'src/services/services.repo';
import { RequestMessage } from 'src/common';
import { TelegrafService } from 'src/telegram-bot/telegraf.service';
import { TelegramBotRepository } from 'src/telegram-bot/telegram-bot.repo';
import { EmailService } from 'src/common/providers/email/email.service';
import { Email } from 'src/i18n/uk';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { ServiceRequestRepository } from './service-request.repo';

@Injectable()
export class ServiceRequestService {
  private readonly logger = new Logger('ServiceRequestService');

  constructor(
    private serviceRequestRepository: ServiceRequestRepository,
    private servicesRepository: ServicesRepository,
    private telegrafService: TelegrafService,
    private telegramBotRepository: TelegramBotRepository,
    private emailService: EmailService,
  ) {}

  async create(createServiceRequestDto: CreateServiceRequestDto) {
    const { services = [] } = createServiceRequestDto;

    const request = await this.serviceRequestRepository.add(
      createServiceRequestDto,
    );

    const servicesList = await this.servicesRepository.getByIdList(services);

    const serviceNames = servicesList.map(({ name }) => name);

    const message = new RequestMessage(request, serviceNames);

    const chatList = await this.telegramBotRepository.getAll();
    const chatIdList = chatList.map(({ chatId }) => chatId);

    if (chatIdList.length) {
      await this.telegrafService.sendMessage(chatIdList, message.markdown());
    }

    this.emailService.sendMessageToAdmin({
      subject: Email.newRequestSubject,
      text: message.text(),
      html: message.html(),
    });

    return {};
  }
}
