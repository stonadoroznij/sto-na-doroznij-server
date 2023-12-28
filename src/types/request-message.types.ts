import { Request } from '@prisma/client';

export type MessageFormat = 'markdown' | 'html' | 'text';

export interface MessageConfig {
  rBold: string;
  lBold: string;
  newLine: string;
}

export type MessageData = Record<keyof Omit<Request, 'id'>, string | number>;
