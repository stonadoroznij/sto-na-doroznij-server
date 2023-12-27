import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { NodemailerService } from './nodemailer.service';

describe('NodemailerService', () => {
  let service: NodemailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodemailerService, ConfigService],
    }).compile();

    service = module.get<NodemailerService>(NodemailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
