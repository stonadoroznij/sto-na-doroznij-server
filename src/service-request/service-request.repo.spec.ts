import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceRequestRepository } from './service-request.repo';

describe('ServiceRequestRepository', () => {
  let service: ServiceRequestRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ServiceRequestRepository],
    }).compile();

    service = module.get<ServiceRequestRepository>(ServiceRequestRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
