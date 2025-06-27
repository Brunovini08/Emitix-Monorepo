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
      throw new Error('Valor da BC do COFINS ST (vBC) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pCOFINS !== 'number' || this.pCOFINS < 0 || this.pCOFINS > 100) {
      throw new Error('Alíquota do COFINS ST (em percentual) (pCOFINS) é obrigatória e deve ser um número entre 0 e 100.');
    }
  }

  public equals(other: BaseCalc): boolean {
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