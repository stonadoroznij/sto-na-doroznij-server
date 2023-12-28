import { Injectable } from '@nestjs/common';
import { ServicesRepository } from './services.repo';

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async findAll() {
    return this.servicesRepository.getAll();
  }
}
