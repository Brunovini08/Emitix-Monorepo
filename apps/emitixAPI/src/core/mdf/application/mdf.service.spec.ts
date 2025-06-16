import { Test, TestingModule } from '@nestjs/testing';
import { MdfService } from './mdf.service';

describe('MdfService', () => {
  let service: MdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MdfService],
    }).compile();

    service = module.get<MdfService>(MdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
