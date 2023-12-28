import { Test, TestingModule } from '@nestjs/testing';
import { CommonModule } from 'src/common/common.module';
import { ServicesRepository } from './services.repo';

describe('ServicesRepository', () => {
  let service: ServicesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [ServicesRepository],
    }).compile();

    service = module.get<ServicesRepository>(ServicesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
