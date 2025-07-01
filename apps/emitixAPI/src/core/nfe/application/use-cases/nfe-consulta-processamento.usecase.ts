import { Injectable } from "@nestjs/common";
import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";
import type { TEnviConsReciNFe } from "../../domain/types/complex_types/TCons/TEnviConsReciNFe";

@Injectable()
export class NfeConsultaProcessamentoUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data: TEnviConsReciNFe): Promise<string> {
    const nfe = data
    const versao = "4.00"
    const xml = await this.nfeXmlBuilder.buildNFeConsultaProcessamento(nfe, versao)
     return xml
  }
}