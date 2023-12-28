import { Module } from '@nestjs/common';
import { ServicesRepository } from './services.repo';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';

@Module({
  controllers: [ServicesController],
  providers: [ServicesRepository, ServicesService],
  exports: [ServicesRepository],
})
export class ServicesModule {}
