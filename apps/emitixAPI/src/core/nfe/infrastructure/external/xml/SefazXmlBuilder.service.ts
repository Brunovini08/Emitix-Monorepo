import { Injectable } from "@nestjs/common";
import { NFeConsultaCadastroBuilder } from "./builders/nfe-consulta-cadastro.builder";
import { NFeConsultaBuilder } from "./builders/nfe-consulta.builder";
import { NFeDanfeBuilder } from "./builders/nfe-danfe.builder";
import { NFeEnvioBuilder } from "./builders/nfe-envio.builder";
import { NFeInutilizarBuilder } from "./builders/nfe-inutilizar.builder";
import { NFeStatusBuilder } from "./builders/nfe-status.builder";
import { NfeConsultaProcessamentoBuilder } from "./builders/nfe-consulta-processamento.builder";
import type { ConsultaProcessamentoNfeEntity } from "src/core/nfe/domain/entities/nfe-consulta-processamento.entity";
import { NfeConsultaJsonInterface } from "src/core/nfe/domain/interfaces/nfe-consulta/nfe-consulta-json.interface";
import { NfeStatusJsonInterface } from "src/core/nfe/domain/interfaces/nfe-status/nfe-status-json.interface";
import { NfeConsultaCadastroJsonInterface } from "src/core/nfe/domain/interfaces/nfe-consulta-cadastro/nfeConsultaCadastroJson.interface";
import { NFeEventoBuilder } from "./builders/nfe-evento.builder";
import { NfeEventoJsonInterface } from "src/core/nfe/domain/interfaces/nfe-evento/nfeEventoJson.inteface";

@Injectable()
export class SefazXmlBuilderService {

  private readonly nfeEnvioBuilder: NFeEnvioBuilder
  private readonly nfeInutilizarBuilder: NFeInutilizarBuilder
  private readonly nfeConsultaBuilder: NFeConsultaBuilder
  private readonly nfeStatusBuilder: NFeStatusBuilder
  private readonly nfeConsultaCadastroBuilder: NFeConsultaCadastroBuilder
  private readonly nfeDanfeBuilder: NFeDanfeBuilder
  private readonly nfeConsultaProcessamentoBuilder: NfeConsultaProcessamentoBuilder
  private readonly nfeEventoBuilder: NFeEventoBuilder

  constructor(
    nfeEnvioBuilder: NFeEnvioBuilder,
    nfeInutilizarBuilder: NFeInutilizarBuilder,
    nfeConsultaBuilder: NFeConsultaBuilder,
    nfeStatusBuilder: NFeStatusBuilder,
    nfeConsultaCadastroBuilder: NFeConsultaCadastroBuilder,
    nfeDanfeBuilder: NFeDanfeBuilder,
    nfeConsultaProcessamentoBuilder: NfeConsultaProcessamentoBuilder,
    nfeEventoBuilder: NFeEventoBuilder,
  ) {
    this.nfeEnvioBuilder = nfeEnvioBuilder
    this.nfeInutilizarBuilder = nfeInutilizarBuilder
    this.nfeConsultaBuilder = nfeConsultaBuilder
    this.nfeStatusBuilder = nfeStatusBuilder
    this.nfeConsultaCadastroBuilder = nfeConsultaCadastroBuilder
    this.nfeDanfeBuilder = nfeDanfeBuilder
    this.nfeConsultaProcessamentoBuilder = nfeConsultaProcessamentoBuilder
    this.nfeEventoBuilder = nfeEventoBuilder
  }

  async buildNFeEnvio(data, chave: string) {
    return this.nfeEnvioBuilder.buildXML(data, chave)
  }

  async buildNFeInutilizar(accessKey: string, objectFormat: Object, versao: string) {
    return this.nfeInutilizarBuilder.inutilizarNFeXml(accessKey, objectFormat, versao)
  }

  async buildNFeConsulta(data: NfeConsultaJsonInterface, versao: string) {
    return this.nfeConsultaBuilder.consultaNFe(data, versao)
  }

  async buildNFeStatus(data: NfeStatusJsonInterface, versao: string) {
    return this.nfeStatusBuilder.statusServico(data, versao)
  }

  async buildNFeConsultaCadastro(data: NfeConsultaCadastroJsonInterface, versao: string) {
    return this.nfeConsultaCadastroBuilder.consultaCadastro(data, versao)
  }

  async buildNFeDanfe(data: any, versao: string) {
    return this.nfeDanfeBuilder.distribuicaoDfe(data, versao)
  }

  async buildNFeConsultaProcessamento(data: ConsultaProcessamentoNfeEntity, versao: string) {
    return this.nfeConsultaProcessamentoBuilder.consultaProcessamento(data, versao)
  }

  async buildNFeEvento(data: NfeEventoJsonInterface, idUser: string, chaveAcesso) {
    return this.nfeEventoBuilder.envioEvento(data, idUser, chaveAcesso)
  }

}