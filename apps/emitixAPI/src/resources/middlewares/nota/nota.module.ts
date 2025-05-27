import { Module } from '@nestjs/common';
import { NotaService } from './nota.service';
import { NFeBuilderService } from 'src/core/nfe/services/nfe-builder.service';
import { IdLoteService } from 'src/core/nfe/services/idLote.service';
import { EmissionService } from '../emission/emission.service';
import { PrismaModule } from 'src/resources/common/prismaConfig/prisma.module';

@Module({
  controllers: [],
  providers: [NFeBuilderService, IdLoteService, EmissionService, NotaService],
  exports: [NotaService],
  imports: [PrismaModule]
})
export class NotasModule { }
