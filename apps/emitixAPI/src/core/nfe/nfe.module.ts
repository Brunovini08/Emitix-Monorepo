import { Module } from '@nestjs/common';
import { NfeController } from './presentation/nfe.controller';
import { NFeBuilderService } from './application/services/nfe-builder.service';
import { IdLoteService } from './application/services/idLote.service';
import { NfeService } from './application/services/nfe.service';

import { IssuerInvoiceModule } from '../issuer/issuer.module';
import { BuildModule } from 'src/shared/middlewares/build/build.module';
import { NotaService } from '../nota/application/nota.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  controllers: [NfeController],
  providers: [NFeBuilderService, NfeService, IdLoteService, NotaService],
  imports: [BuildModule, RedisModule, IssuerInvoiceModule],
  exports: [NFeBuilderService, NfeService, IdLoteService],
})
export class NfeModule {}
