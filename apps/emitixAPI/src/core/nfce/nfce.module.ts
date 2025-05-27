import { Module } from '@nestjs/common';
import { NfceService } from './services/nfce.service';
import { NfceController } from './nfce.controller';
import { NotaService } from 'src/resources/middlewares/nota/nota.service';
import { IdLoteService } from '../nfe/services/idLote.service';
import { BuildService } from 'src/resources/middlewares/build/build.service';
import { IssuerService } from '../issuer/issuer.service';

@Module({
  controllers: [NfceController],
  providers: [NfceService, NotaService, IdLoteService, BuildService, IssuerService],
})
export class NfceModule {}
