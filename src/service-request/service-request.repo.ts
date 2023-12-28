import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';

@Injectable()
export class ServiceRequestRepository {
  constructor(private prisma: PrismaService) {}

  async add(formData: CreateServiceRequestDto) {
    const { phone, services, carYear, ...rest } = formData;

    const result = await this.prisma.request.create({
      data: {
        phoneNumber: phone,
        carYear: carYear ? Number.parseInt(carYear) : null,
        services: {
          connect: services?.map((service) => ({ id: service })),
        },
        ...rest,
      },
    });

    return result;
  }

  async getById(id: number) {
    const result = await this.prisma.request.findUnique({
      where: { id },
      include: {
        services: true,
      },
    });

    return result;
  }
}
