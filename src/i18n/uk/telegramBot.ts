import { MessageData, MessageConfig } from 'src/types';

export const TelegramBot = {
  writePassword: 'Введіть пароль!',
  wrongPassword: 'Невірний пароль!',
  alreadySubscribed: 'Ви вже підписані на розсилку!',
  notSubscribed: 'Ви не підписані на розсилку!',
  subscribe: 'Ви підписалися на розсилку!',
  unsubscribe: 'Ви відписались від розсилки!',
  startMessage:
    'Привіт! Я бот, який буде надсилати тобі повідомлення про заявки на послуги в "СТО на Дорожній". Для початку роботи підпишись на розсилку командою /join.',
  requestTemplate: (
    messageData: MessageData,
    services: string,
    config: MessageConfig,
  ) => {
    const { rBold, lBold, newLine } = config;

    const {
      name,
      phoneNumber,
      email,
      carBrand,
      carModel,
      carYear,
      vinCode,
      message,
    } = messageData;

    return `
      ${rBold}Нова заявка з сайту!${lBold}${newLine}${newLine}

      ${rBold}Ім'я:${lBold} ${name}${newLine}
      ${rBold}Телефон:${lBold} ${phoneNumber}${newLine}
      ${rBold}Email:${lBold} ${email}${newLine}
      ${rBold}Марка авто:${lBold} ${carBrand}${newLine}
      ${rBold}Модель авто:${lBold} ${carModel}${newLine}
      ${rBold}Рік авто:${lBold} ${carYear}${newLine}
      ${rBold}VIN код:${lBold} ${vinCode}${newLine}
      ${rBold}Послуги:${lBold} ${services}${newLine}
      ${rBold}Повідомлення:${lBold} ${message}`;
  },
};
