import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class TCancelamentoVO {
  descEvento: string;
  nProt: string
  xJust: string;

  constructor(
    data: {
      descEvento: string,
      nProt: string,
      xJust: string
    }
  ) {
    this.descEvento = data.descEvento;
    this.nProt = data.nProt;
    this.xJust = data.xJust;
    this.validateOrThrow();
  }

  private validateOrThrow() {
    if (!this.descEvento) {
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
      descEvento: this.descEvento,
      nProt: this.nProt,
      xJust: this.xJust
    };
  }
}