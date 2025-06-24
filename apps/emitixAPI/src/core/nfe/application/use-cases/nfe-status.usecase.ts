import { Injectable } from "@nestjs/common";

import { SefazXmlBuilderService } from "../../infrastructure/xml/SefazXmlBuilder.service";

import { NFe } from "../../domain/entities/nfe.entity";

@Injectable()
export class NfeStatusUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data: NFe): Promise<string> {
    const nfe = data.toJSON()
    const xml = await this.nfeXmlBuilder.buildNFeStatus(nfe.NFe, nfe.versao)
   return xml
  }
}