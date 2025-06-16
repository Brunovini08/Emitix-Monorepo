import { forwardRef, Module } from '@nestjs/common';
import { NotaService } from '../../../core/nota/application/nota.service';
import { NFeBuilderService } from 'src/core/nfe/infrastructure/services/nfe-builder.service';
import { IdLoteService } from 'src/core/nfe/application/services/idLote.service';
import { EmissionService } from '../../../core/emission/application/emission.service';
import { NfceModule } from 'src/core/nfce/nfce.module';
import { PrismaService } from 'src/shared/common/prismaConfig/prisma.service';

@Module({
  controllers: [],
  providers: [NFeBuilderService, IdLoteService, EmissionService, NotaService, PrismaService],
  exports: [NotaService],
  imports: [forwardRef(() => NfceModule)]
})
export class NotasModule { }
