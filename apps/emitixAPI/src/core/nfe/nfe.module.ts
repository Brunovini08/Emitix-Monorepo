import { Module } from '@nestjs/common';
import { NfeController } from './nfe.controller';
import { NFeBuilderService } from './services/nfe-builder.service';
import { IdLoteService } from './services/idLote.service';
import { NfeService } from './services/nfe.service';
import { NotaService } from 'src/resources/middlewares/nota/nota.service';
import { BuildModule } from 'src/resources/middlewares/build/build.module';
import { RedisModule } from 'src/resources/middlewares/redis/redis.module';
import { IssuerInvoiceModule } from '../issuer/issuer.module';


@Module({
  controllers: [NfeController],
  providers: [
    NFeBuilderService,
    NfeService,
    IdLoteService,
    NotaService,
  ],
  imports: [BuildModule, RedisModule, IssuerInvoiceModule],
  exports: [NFeBuilderService, NfeService, IdLoteService]
})
export class NfeModule { }
