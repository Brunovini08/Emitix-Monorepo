import { Module } from '@nestjs/common';
import { MdfService } from './application/mdf.service';
import { MdfController } from './presentation/mdf.controller';

@Module({
  controllers: [MdfController],
  providers: [MdfService],
})
export class MdfModule {}
