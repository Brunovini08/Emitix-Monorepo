import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class BaseCalc {
  public readonly vBC: number;
  public readonly pCOFINS: number;

  constructor(data: { vBC: number, pCOFINS: number }) {
    this.vBC = data.vBC;
    this.pCOFINS = data.pCOFINS;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (typeof this.vBC !== 'number' || this.vBC < 0) {
      throw new DomainError('Valor da BC do COFINS (vBC) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pCOFINS !== 'number' || this.pCOFINS < 0 || this.pCOFINS > 100) {
      throw new DomainError('Alíquota do COFINS (em percentual) (pCOFINS) é obrigatória e deve ser um número entre 0 e 100.');
    }
  }

  public equals(other: BaseCalc | undefined): boolean {
    if (!(other instanceof BaseCalc)) {
      return false;
    }
    return (
      this.vBC === other.vBC &&
      this.pCOFINS === other.pCOFINS
    );
  }

  public toJSON() {
    return {
      vBC: this.vBC.toFixed(2),
      pCOFINS: this.pCOFINS.toFixed(2),
    };
  }
}