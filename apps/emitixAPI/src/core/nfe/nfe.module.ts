import { Module } from '@nestjs/common';
import { NfeController } from './nfe.controller';
import { NFeBuilderService } from './services/nfe-builder.service';
import { IssuerService } from '../issuer/issuer.service';
import { BuildService } from 'src/resources/middlewares/build/build.service';
import { IdLoteService } from './services/idLote.service';
import { RedisService } from 'src/resources/middlewares/is-unique-day/redis/redis.service';
import { PrismaService } from 'src/prisma.service';
import { EmissionService } from 'src/resources/middlewares/emission/emission.service';
import { NfeService } from './services/nfe.service';
import { NotasModule } from 'src/resources/middlewares/nota/nota.module';

@Module({
  controllers: [NfeController],
  providers: [
    NFeBuilderService,
    NfeService,
    IssuerService,
    BuildService,
    IdLoteService,
    RedisService,
    PrismaService,
    EmissionService
  ],
  exports: [NFeBuilderService, NfeService, IdLoteService],
  imports: [NotasModule]
})
export class NfeModule { }
