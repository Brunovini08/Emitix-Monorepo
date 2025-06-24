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
      throw new Error('Valor da BC do PIS ST (vBC) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pPis !== 'number' || this.pPis < 0 || this.pPis > 100) {
      throw new Error('Alíquota do PIS ST (em percentual) (pPis) é obrigatória e deve ser um número entre 0 e 100.');
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
      vBC: this.vBC,
      pPis: this.pPis,
    };
  }
}