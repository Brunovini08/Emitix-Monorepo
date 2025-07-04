import { Injectable } from "@nestjs/common";

import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";

import { NFe } from "../../domain/entities/nfe-emitir.entity";
import { NfeStatusJsonInterface } from "../../domain/interfaces/nfe-status/nfe-status-json.interface";

@Injectable()
export class NfeStatusUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data, versao: string): Promise<string> {
    const xml = await this.nfeXmlBuilder.buildNFeStatus(data, versao)
    return xml
  }
}