import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class BaseCalc {
  public readonly vBC;
  public readonly pPis;

  constructor(data: { vBC: number, pPis: number }) {
    this.vBC = data.vBC;
    this.pPis = data.pPis;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (typeof this.vBC !== 'number' || this.vBC < 0) {
      throw new DomainError('Valor da BC do PIS ST (vBC) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pPis !== 'number' || this.pPis < 0 || this.pPis > 100) {
      throw new DomainError('Alíquota do PIS ST (em percentual) (pPis) é obrigatória e deve ser um número entre 0 e 100.');
    }
  }

  public equals(other) {
    if (!(other instanceof BaseCalc)) {
      return false;
    }
    return (
      this.vBC === other.vBC &&
      this.pPis === other.pPis
    );
  }

  public toJSON() {
    return {
      vBC: this.vBC.toFixed(2),
      pPis: this.pPis.toFixed(2),
    };
  }
}