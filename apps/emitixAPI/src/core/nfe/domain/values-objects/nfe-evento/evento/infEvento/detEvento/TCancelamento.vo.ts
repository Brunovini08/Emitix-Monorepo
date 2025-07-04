import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class TCancelamentoVO {
  descevento: string;
  nProt: string
  xJust: string;

  constructor(
    data: {
      descEvento: string,
      nProt: string,
      xJust: string
    }
  ) {
    this.descevento = data.descEvento;
    this.nProt = data.nProt;
    this.xJust = data.xJust;
    this.validateOrThrow();
  }

  private validateOrThrow() {
    if (!this.descevento) {
      throw new DomainError('O elemento descEvento é obrigatório');
    }
    if (!this.nProt) {
      throw new DomainError('O elemento nProt é obrigatório');
    }
    if (!this.xJust) {
      throw new DomainError('O elemento xJust é obrigatório');
    }
  }

  public toJSON() {
    return {
      descevento: this.descevento,
      nProt: this.nProt,
      xJust: this.xJust
    };
  }
}