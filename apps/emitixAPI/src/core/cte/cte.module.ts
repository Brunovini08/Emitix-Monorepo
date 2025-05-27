import { Module } from '@nestjs/common';
import { CteService } from './cte.service';
import { CteController } from './cte.controller';

@Module({
  controllers: [CteController],
  providers: [CteService],
})
export class CteModule {}
