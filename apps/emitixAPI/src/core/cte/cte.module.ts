import { Module } from '@nestjs/common';
import { CteService } from './application/services/cte.service';
import { CteController } from './presentation/cte.controller';

@Module({
  controllers: [CteController],
  providers: [CteService],
})
export class CteModule {}
