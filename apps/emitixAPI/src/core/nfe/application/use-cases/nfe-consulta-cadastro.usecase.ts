import { Injectable } from "@nestjs/common";

import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";

import { NFe } from "../../domain/entities/nfe-emitir.entity";
import { NfeConsultaCadastroJsonInterface } from "../../domain/interfaces/nfe-consulta-cadastro/nfeConsultaCadastroJson.interface";

@Injectable()
export class NfeConsultaCadastroUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data): Promise<string> {
    const xml = await this.nfeXmlBuilder.buildNFeConsultaCadastro(data, data.ConsCad.versao)
    return xml
  }
}