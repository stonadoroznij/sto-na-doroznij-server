import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServicesRepository } from './services.repo';

@Module({
  providers: [PrismaService, ServicesRepository],
  exports: [ServicesRepository],
})
export class ServicesModule {}
