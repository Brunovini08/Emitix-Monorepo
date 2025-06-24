import { Injectable } from "@nestjs/common";
import { NFeConsultaCadastroBuilder } from "./builders/nfe-consulta-cadastro.builder";
import { NFeConsultaBuilder } from "./builders/nfe-consulta.builder";
import { NFeDanfeBuilder } from "./builders/nfe-danfe.builder";
import { NFeEnvioBuilder } from "./builders/nfe-envio.builder";
import { NFeInutilizarBuilder } from "./builders/nfe-inutilizar.builder";
import { NFeStatusBuilder } from "./builders/nfe-status.builder";
import { NFe } from "../../domain/entities/nfe.entity";

@Injectable()
export class SefazXmlBuilderService {

  private readonly nfeEnvioBuilder: NFeEnvioBuilder
  private readonly nfeInutilizarBuilder: NFeInutilizarBuilder
  private readonly nfeConsultaBuilder: NFeConsultaBuilder
  private readonly nfeStatusBuilder: NFeStatusBuilder
  private readonly nfeConsultaCadastroBuilder: NFeConsultaCadastroBuilder
  private readonly nfeDanfeBuilder: NFeDanfeBuilder

  constructor(
    nfeEnvioBuilder: NFeEnvioBuilder,
    nfeInutilizarBuilder: NFeInutilizarBuilder,
    nfeConsultaBuilder: NFeConsultaBuilder,
    nfeStatusBuilder: NFeStatusBuilder,
    nfeConsultaCadastroBuilder: NFeConsultaCadastroBuilder,
    nfeDanfeBuilder: NFeDanfeBuilder,
  ) {
    this.nfeEnvioBuilder = nfeEnvioBuilder
    this.nfeInutilizarBuilder = nfeInutilizarBuilder
    this.nfeConsultaBuilder = nfeConsultaBuilder
    this.nfeStatusBuilder = nfeStatusBuilder
    this.nfeConsultaCadastroBuilder = nfeConsultaCadastroBuilder
    this.nfeDanfeBuilder = nfeDanfeBuilder
  }

  async buildNFeEnvio(data: NFe, cNF: string, cDV: string, chave: string) {
    return this.nfeEnvioBuilder.buildXML(data, cNF, cDV, chave)
  }

  async buildNFeInutilizar(accessKey: string, objectFormat: any, versao: string) {
    return this.nfeInutilizarBuilder.inutilizarNFeXml(accessKey, objectFormat, versao)
  }

  async buildNFeConsulta(data: any, versao: string) {
    return this.nfeConsultaBuilder.consultaNFe(data, versao)
  }

  async buildNFeStatus(data: any, versao: string) {
    return this.nfeStatusBuilder.statusServico(data, versao)
  }

  async buildNFeConsultaCadastro(data: any, versao: string) {
    return this.nfeConsultaCadastroBuilder.consultaCadastro(data, versao)
  }

  async buildNFeDanfe(data: any, versao: string) {
    return this.nfeDanfeBuilder.distribuicaoDfe(data, versao)
  }
  
}