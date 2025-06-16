import { Test, TestingModule } from '@nestjs/testing';
import { MdfController } from './mdf.controller';
import { MdfService } from '../application/mdf.service';

describe('MdfController', () => {
  let controller: MdfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MdfController],
      providers: [MdfService],
    }).compile();

    controller = module.get<MdfController>(MdfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
