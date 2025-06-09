import { Test, TestingModule } from '@nestjs/testing';
import { CteService } from './cte.service';

describe('CteService', () => {
  let service: CteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CteService],
    }).compile();

    service = module.get<CteService>(CteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
