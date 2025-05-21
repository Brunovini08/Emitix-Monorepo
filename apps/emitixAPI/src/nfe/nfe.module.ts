import { Module } from '@nestjs/common';
import { NfeService } from './services/nfe.service';
import { NfeController } from './nfe.controller';
import { NFeBuilderService } from './services/nfe-builder.service';
import { IdLoteService } from './services/idLote.service';
import { PrismaService } from 'src/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { IssuerService } from 'src/issuer/issuer.service';
import { EmissionService } from 'src/emission/emission.service';

@Module({
  controllers: [NfeController],
  providers: [
    NfeService,
    NFeBuilderService,
    IdLoteService,
    PrismaService,
    RedisService,
    IssuerService,
    EmissionService
  ],
})
export class NfeModule {}
