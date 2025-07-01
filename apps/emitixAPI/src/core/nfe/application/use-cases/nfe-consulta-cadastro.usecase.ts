import { Injectable } from "@nestjs/common";

import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";

import { NFe } from "../../domain/entities/nfe-emitir.entity";

@Injectable()
export class NfeConsultaCadastroUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data: NFe): Promise<string> {
    const nfe = data.toJSON()
    const xml = await this.nfeXmlBuilder.buildNFeConsultaCadastro(nfe.NFe, nfe.versao)
   return xml
  }
}