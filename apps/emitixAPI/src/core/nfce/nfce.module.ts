import { Module } from '@nestjs/common';
import { NfceService } from './services/nfce.service';
import { NfceController } from './nfce.controller';

@Module({
  controllers: [NfceController],
  providers: [NfceService],
})
export class NfceModule {}
