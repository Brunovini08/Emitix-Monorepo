import { Injectable } from "@nestjs/common";
import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";
import { ConsultaProcessamentoNfeEntity } from "../../domain/entities/consultaProcessamentoNfe.entity";

@Injectable()
export class NfeConsultaProcessamentoUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data: ConsultaProcessamentoNfeEntity): Promise<string> {
    const nfe = data
    const xml = await this.nfeXmlBuilder.buildNFeConsultaProcessamento(nfe, nfe.versao)
     return xml
  }
}