import { Injectable } from "@nestjs/common";

import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";
import { NfeConsultaJsonInterface } from "../../domain/interfaces/nfe-consulta/nfe-consulta-json.interface";

@Injectable()
export class NfeConsultaUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data): Promise<string> {
    const nfe = data
    const versao = "4.00"
    const xml = await this.nfeXmlBuilder.buildNFeConsulta(nfe, versao)
     return xml
  }
}