import { Injectable } from "@nestjs/common";
import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";
import { NFe } from "../../domain/entities/nfe-emitir.entity";
import type TEnvInutNfe from "../../domain/types/complex_types/TInut/TEnvInutNfe";
import type TInutNFe from "../../domain/types/complex_types/TInut/TInutNfe";
import type { InutNFe } from "../../domain/entities/nfe-inutilizar.entity";
import { NfeInutilizarJsonInterface } from "../../domain/interfaces/nfe-inutilizar/nfe-inutilizar-json.interface";

@Injectable()
export class NfeInutilizarUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data: NfeInutilizarJsonInterface): Promise<string> {
    const nfe = data
    const xml = await this.nfeXmlBuilder.buildNFeInutilizar(nfe.nfeChaveAcesso, data.inutNFe, nfe.versao)
    return xml
  } 
}