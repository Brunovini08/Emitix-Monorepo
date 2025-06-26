import { Injectable } from "@nestjs/common";
import { SefazXmlBuilderService } from "../../infrastructure/xml/SefazXmlBuilder.service";
import type { NFe } from "../../domain/entities/nfe.entity";

@Injectable()
export class NfeEmitirUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data: NFe): Promise<string> {
    const nfe = data.toJSON()
    const xml = await this.nfeXmlBuilder.buildNFeEnvio(nfe.NFe, nfe.nfeChaveAcesso)
    return xml.xml
  }
}