import { InfEventoVO } from "../values-objects/nfe-evento/evento/infEvento/infEvento.vo"

export class NFeEventoEntity {
  versao: string
  infEvento: InfEventoVO  
  private chaveAcesso: string
  private id: string

  constructor(data: {
    versao: string
    infEvento: InfEventoVO
    chaveAcesso: string
  }) {
    this.versao = data.versao
    this.infEvento = data.infEvento
    this.chaveAcesso = data.chaveAcesso
    this.id = this.generateId()
  }

  private generateId() {
    return `ID${this.infEvento.tpEvento}${this.chaveAcesso}${Number(this.infEvento.nSeqEvento) < 10 ? "0" : ""}${this.infEvento.nSeqEvento}`
  }

  public toJSON() {
    return {
      versao: this.versao,
      infEvento: this.infEvento.toJSON(),
      chaveAcesso: this.chaveAcesso,
      id: this.id
    }
  }
}