import { Injectable } from "@nestjs/common";
import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";
import { NFe } from "../../domain/entities/nfe.entity";
import type TEnvInutNfe from "../../domain/types/complex_types/TInut/TEnvInutNfe";

@Injectable()
export class NfeInutilizarUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data: any): Promise<string> {
    const nfe = data
    const xml = await this.nfeXmlBuilder.buildNFeInutilizar(nfe.nfeChaveAcesso, nfe.NFe, nfe.versao)
    return xml
  }
}