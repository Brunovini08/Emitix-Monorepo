import { Module } from '@nestjs/common';
import { NfceService } from './services/nfce.service';
import { NfceController } from './nfce.controller';
import { IdLoteService } from '../nfe/services/idLote.service';
import { BuildService } from 'src/resources/middlewares/build/build.service';
import { IssuerService } from '../issuer/issuer.service';
import { NFceBuilderService } from './services/nfce-builder.service';
import { NotasModule } from 'src/resources/middlewares/nota/nota.module';

@Module({
  controllers: [NfceController],
  providers: [NfceService, NFceBuilderService, IdLoteService, BuildService, IssuerService],
  imports: [NotasModule]
})
export class NfceModule { }
