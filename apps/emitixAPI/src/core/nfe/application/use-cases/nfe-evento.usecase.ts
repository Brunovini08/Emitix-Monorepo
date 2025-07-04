import { Injectable } from "@nestjs/common";
import { SefazXmlBuilderService } from "../../infrastructure/external/xml/SefazXmlBuilder.service";
import { NfeEventoJsonInterface } from "../../domain/interfaces/nfe-evento/nfeEventoJson.inteface";

@Injectable()
export class NfeEventoUsecase {
    constructor(
        private readonly nfeXmlBuilder: SefazXmlBuilderService
    ) { }

    async execute(data: NfeEventoJsonInterface, idUser: string, chaveAcesso: string): Promise<any> {
        const xml = await this.nfeXmlBuilder.buildNFeEvento(data, idUser, chaveAcesso)
        return xml
    }
}