import { InfEventoVO } from "./infEvento/infEvento.vo"

export class EventoVO {
  versao: string
  infEvento: InfEventoVO

  constructor(data: {
    versao: string
    infEvento: InfEventoVO
  }) {
    this.versao = data.versao
    this.infEvento = data.infEvento
  }
  public toJSON() {
    return {
      versao: this.versao,
      infEvento: this.infEvento.toJSON()
    }
  }
}