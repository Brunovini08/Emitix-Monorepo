import { Module } from '@nestjs/common';
import { NotaService } from './nota.service';
import { PrismaService } from 'src/prisma.service';
import { NFeBuilderService } from 'src/core/nfe/services/nfe-builder.service';
import { IdLoteService } from 'src/core/nfe/services/idLote.service';
import { EmissionService } from '../emission/emission.service';
import { BuildModule } from '../build/build.module';
import { RedisModule } from '../is-unique-day/redis/redis.module';

@Module({
  controllers: [],
  providers: [
    NotaService,
    PrismaService,
    NFeBuilderService,
    IdLoteService,
    EmissionService
  ],
  exports: [NotaService],
  imports: [BuildModule, RedisModule]
})
export class NotasModule { }
