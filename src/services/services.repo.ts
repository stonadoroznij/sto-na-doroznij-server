import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServicesRepository {
  constructor(private prisma: PrismaService) {}

  async getByRequestId(id: number) {
    const result = await this.prisma.service.findMany({
      where: {
        requests: {
          some: {
            id,
          },
        },
      },
    });

    return result;
  }

  async getByIdList(idList: number[]) {
    const result = await this.prisma.service.findMany({
      where: {
        id: {
          in: idList,
        },
      },
    });

    return result;
  }

  async getAll() {
    const result = await this.prisma.service.findMany();

    return result;
  }
}
