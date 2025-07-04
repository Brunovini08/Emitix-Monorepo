import { DomainError } from "../../../errors/domain.error";

export class GCompraGov {
  public readonly tpEnteGov: string;
  public readonly pRedutor: number;

  constructor(data: {
    tpEnteGov: string;
    pRedutor: number;
  }) {
    this.tpEnteGov = data.tpEnteGov;
    this.pRedutor = data.pRedutor;
  }

  public validateOrThrow(): void {
    if (!this.tpEnteGov) {
      throw new DomainError('tpEnteGov é obrigatório');
    }
    if (!this.pRedutor) {
      throw new DomainError('pRedutor é obrigatório');
    }
  }

  toJSON() {
    return {
      gCompraGov: {
        tpEnteGov: this.tpEnteGov,
        pRedutor: this.pRedutor,
      }
    }
  }
}