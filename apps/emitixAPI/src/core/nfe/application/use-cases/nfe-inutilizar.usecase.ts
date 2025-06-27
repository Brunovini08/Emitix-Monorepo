import { Injectable } from "@nestjs/common";
import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";
import { NFe } from "../../domain/entities/nfe.entity";

@Injectable()
export class NfeInutilizarUseCase {
  constructor(
    private readonly nfeXmlBuilder: SefazXmlBuilderService,
  ) {
    this.nfeXmlBuilder = nfeXmlBuilder
  }

  async execute(data: NFe): Promise<string> {
    const nfe = data.toJSON()
    const xml = await this.nfeXmlBuilder.buildNFeInutilizar(nfe.nfeChaveAcesso, nfe.NFe, nfe.versao)
    return xml
  }
}