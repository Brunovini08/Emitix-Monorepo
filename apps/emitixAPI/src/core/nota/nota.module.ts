import { forwardRef, Module } from '@nestjs/common';
import { NotaService } from './application/nota.service';
import { NFeBuilderService } from 'src/core/nfe/application/services/nfe-builder.service';
import { IdLoteService } from 'src/core/nfe/application/services/idLote.service';
import { EmissionService } from '../emission/application/emission.service';
import { NfceModule } from 'src/core/nfce/nfce.module';
import { PrismaModule } from 'src/shared/common/prismaConfig/prisma.module';

@Module({
  controllers: [],
  providers: [NFeBuilderService, IdLoteService, EmissionService, NotaService],
  exports: [NotaService],
  imports: [PrismaModule, forwardRef(() => NfceModule)]
})
export class NotasModule { }
