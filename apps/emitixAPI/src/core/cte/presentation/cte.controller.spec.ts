import { Test, TestingModule } from '@nestjs/testing';
import { CteController } from '../presentation/cte.controller';
import { CteService } from '../application/services/cte.service';

describe('CteController', () => {
  let controller: CteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CteController],
      providers: [CteService],
    }).compile();

    controller = module.get<CteController>(CteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
