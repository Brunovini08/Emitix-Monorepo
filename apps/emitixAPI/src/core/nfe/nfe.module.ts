import { Module } from '@nestjs/common';
import { NfeController } from './presentation/nfe.controller';
import { IdLoteService } from './infrastructure/external/sefaz/services/idLote.service';
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
import { EnviNFeGen } from './infrastructure/external/sefaz/services/enviNFeGen.util';
import { NFeConsultaCadastroBuilder } from './infrastructure/external/xml/builders/nfe-consulta-cadastro.builder';
import { NFeConsultaBuilder } from './infrastructure/external/xml/builders/nfe-consulta.builder';
import { NFeDanfeBuilder } from './infrastructure/external/xml/builders/nfe-danfe.builder';
import { NFeEnvioBuilder } from './infrastructure/external/xml/builders/nfe-envio.builder';
import { NFeInutilizarBuilder } from './infrastructure/external/xml/builders/nfe-inutilizar.builder';
import { NFeStatusBuilder } from './infrastructure/external/xml/builders/nfe-status.builder';
import { SefazXmlBuilderService } from './infrastructure/external/xml/SefazXmlBuilder.service';
import { SignedXmlUtil } from './infrastructure/external/xml/sign/signedXml.util';
import { NfeConsultaProcessamentoBuilder } from './infrastructure/external/xml/builders/nfe-consulta-processamento.builder';
import { NfeConsultaProcessamentoUseCase } from './application/use-cases/nfe-consulta-processamento.usecase';

@Module({
  controllers: [NfeController],
  providers: [NfeService, IdLoteService, NotaService, NfeEmitirUseCase,
    NfeInutilizarUseCase, NfeConsultaUseCase, NfeStatusUseCase,
    NfeConsultaCadastroUseCase, NfeDanfeUseCase, NfeConsultaProcessamentoUseCase, CertificateService,
    SignedXmlUtil, IdLoteService, SefazXmlBuilderService, NFeEnvioBuilder,
    NFeInutilizarBuilder, NFeConsultaBuilder, NFeStatusBuilder,
    NFeConsultaCadastroBuilder, NFeDanfeBuilder, EnviNFeGen, NfeConsultaProcessamentoBuilder],
  imports: [RedisModule, IssuerInvoiceModule, HttpModule],
  exports: [NfeService, IdLoteService],
})
export class NfeModule {}
