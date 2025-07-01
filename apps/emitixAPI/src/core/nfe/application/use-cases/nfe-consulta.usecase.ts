import { Injectable } from "@nestjs/common";

import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";
import { NFe } from "../../domain/entities/nfe-emitir.entity";

@Injectable()
export class NfeConsultaUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data): Promise<string> {
    const nfe = data.consReciNFe
    const versao = "4.00"
    const xml = await this.nfeXmlBuilder.buildNFeConsulta(nfe, versao)
     return xml
  }
}