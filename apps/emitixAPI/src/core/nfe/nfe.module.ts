import { Module } from '@nestjs/common';
import { NfeController } from './presentation/nfe.controller';
import { IdLoteService } from './infrastructure/sefaz/services/idLote.service';
import { NfeService } from './application/services/nfe.service';

import { IssuerInvoiceModule } from '../issuer/issuer.module';
import { NotaService } from './application/services/nota.service';
import { RedisModule } from '../redis/redis.module';
import { HttpModule } from '@nestjs/axios';
import { NfeEmitirUseCase } from './application/use-cases/nfe-emitir.usecase';
import { NfeConsultaCadastroUseCase } from './application/use-cases/nfe-consulta-cadastro.usecase';
import { NfeConsultaUseCase } from './application/use-cases/nfe-consulta.usecase';
import { NfeDanfeUseCase } from './application/use-cases/nfe-danfe.usecase';
import { NfeInutilizarUseCase } from './application/use-cases/nfe-inutilizar.usecase';
import { NfeStatusUseCase } from './application/use-cases/nfe-status.usecase';
import { CertificateService } from './infrastructure/certificate/certificate.service';
import { SignedXmlUtil } from './infrastructure/xml/sign/signedXml.util';
import { SefazXmlBuilderService } from './infrastructure/xml/SefazXmlBuilder.service';
import { NFeEnvioBuilder } from './infrastructure/xml/builders/nfe-envio.builder';
import { NFeInutilizarBuilder } from './infrastructure/xml/builders/nfe-inutilizar.builder';
import { NFeConsultaBuilder } from './infrastructure/xml/builders/nfe-consulta.builder';
import { NFeStatusBuilder } from './infrastructure/xml/builders/nfe-status.builder';
import { NFeConsultaCadastroBuilder } from './infrastructure/xml/builders/nfe-consulta-cadastro.builder';
import { NFeDanfeBuilder } from './infrastructure/xml/builders/nfe-danfe.builder';

@Module({
  controllers: [NfeController],
  providers: [NfeService, IdLoteService, NotaService, NfeEmitirUseCase,
    NfeInutilizarUseCase, NfeConsultaUseCase, NfeStatusUseCase,
    NfeConsultaCadastroUseCase, NfeDanfeUseCase, CertificateService,
    SignedXmlUtil, IdLoteService, SefazXmlBuilderService, NFeEnvioBuilder,
    NFeInutilizarBuilder, NFeConsultaBuilder, NFeStatusBuilder,
    NFeConsultaCadastroBuilder, NFeDanfeBuilder],
  imports: [RedisModule, IssuerInvoiceModule, HttpModule],
  exports: [NfeService, IdLoteService],
})
export class NfeModule {}
