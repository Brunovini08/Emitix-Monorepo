import { forwardRef, Module } from '@nestjs/common';
import { NfceService } from './application/services/nfce.service';
import { NfceController } from './presentation/nfce.controller';
import { IdLoteService } from '../nfe/application/services/idLote.service';
import { BuildService } from 'src/shared/middlewares/build/build.service';
import { IssuerService } from '../issuer/application/issuer.service';
import { NFceBuilderService } from './application/services/nfce-builder.service';
import { NotasModule } from '../nota/nota.module';
@Module({
  controllers: [NfceController],
  providers: [NfceService, NFceBuilderService, IdLoteService, BuildService, IssuerService],
  imports: [forwardRef(() => NotasModule)],
  exports: [NFceBuilderService]
})
export class NfceModule { }
