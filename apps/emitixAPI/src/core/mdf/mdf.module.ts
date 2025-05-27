import { Module } from '@nestjs/common';
import { MdfService } from './mdf.service';
import { MdfController } from './mdf.controller';

@Module({
  controllers: [MdfController],
  providers: [MdfService],
})
export class MdfModule {}
