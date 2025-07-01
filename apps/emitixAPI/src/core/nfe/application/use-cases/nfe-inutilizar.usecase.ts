import { Injectable } from "@nestjs/common";
import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";
import { NFe } from "../../domain/entities/nfe.entity";
import type TEnvInutNfe from "../../domain/types/complex_types/TInut/TEnvInutNfe";
import type TInutNFe from "../../domain/types/complex_types/TInut/TInutNfe";
import type { InutNFe } from "../../domain/entities/inutNFe.entity";

@Injectable()
export class NfeInutilizarUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data: InutNFe): Promise<string> {
    const nfe = data.toJSON()
    const xml = await this.nfeXmlBuilder.buildNFeInutilizar(nfe.nfeChaveAcesso, data, nfe.versao)
    return xml
  }
}