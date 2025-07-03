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

  async execute(data, versao: string): Promise<string> {
    const xml = await this.nfeXmlBuilder.buildNFeConsulta(data, versao)
    return xml
  }
}