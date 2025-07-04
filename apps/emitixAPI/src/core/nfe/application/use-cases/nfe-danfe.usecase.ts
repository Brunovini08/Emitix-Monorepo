import { Injectable } from "@nestjs/common";

import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";
import { NFe } from "../../domain/entities/nfe-emitir.entity";

@Injectable()
export class NfeDanfeUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data, versao): Promise<string> {
    const xml = await this.nfeXmlBuilder.buildNFeDanfe(data, versao)
    return xml
  }
}