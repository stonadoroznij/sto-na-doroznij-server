import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServicesRepository } from './services.repo';

describe('ServicesRepository', () => {
  let service: ServicesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ServicesRepository],
    }).compile();

    service = module.get<ServicesRepository>(ServicesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
