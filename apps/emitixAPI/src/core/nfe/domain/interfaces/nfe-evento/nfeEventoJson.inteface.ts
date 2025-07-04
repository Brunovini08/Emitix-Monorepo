import { InfEventoVO } from "../../values-objects/nfe-evento/evento/infEvento/infEvento.vo"

export interface NfeEventoJsonInterface {
    versao: string
    infEvento: InfEventoVO
    chaveAcesso: string
    id: string
}