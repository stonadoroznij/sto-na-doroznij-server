import { Request } from '@prisma/client';

export type MessageData = Record<keyof Omit<Request, 'id'>, string | number>;
