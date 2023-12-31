import { Test, TestingModule } from '@nestjs/testing';
import { CommonModule } from 'src/common/common.module';
import { ServiceRequestRepository } from './service-request.repo';

describe('ServiceRequestRepository', () => {
  let service: ServiceRequestRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [ServiceRequestRepository],
    }).compile();

    service = module.get<ServiceRequestRepository>(ServiceRequestRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
