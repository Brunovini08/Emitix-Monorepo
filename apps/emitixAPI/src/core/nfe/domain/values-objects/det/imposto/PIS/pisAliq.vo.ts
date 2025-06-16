export class PISAliq {
  public readonly CST;
  public readonly vBC;
  public readonly pPIS;
  public readonly vPIS;

  constructor(data) {
    this.CST = data.CST;
    this.vBC = data.vBC;
    this.pPIS = data.pPIS;
    this.vPIS = data.vPIS;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    const allowedCST = ['01', '02'];
    if (typeof this.CST !== 'string' || !allowedCST.includes(this.CST)) {
      throw new Error(`
        Código de Situação Tributária do PIS (CST) é obrigatório e deve ser "01" ou "02":
        01 - Operação Tributável - Base de Cálculo = Valor da Operação Alíquota Normal (Cumulativo/Não Cumulativo);
        02 - Operação Tributável - Base de Calculo = Valor da Operação (Alíquota Diferenciada).
      `);
    }

    if (typeof this.vBC !== 'number' || this.vBC < 0) {
      throw new Error('Valor da BC do PIS (vBC) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pPIS !== 'number' || this.pPIS < 0 || this.pPIS > 100) {
      throw new Error('Alíquota do PIS (em percentual) (pPIS) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vPIS !== 'number' || this.vPIS < 0) {
      throw new Error('Valor do PIS (vPIS) é obrigatório e deve ser um número não negativo.');
    }
  }

  public equals(other) {
    if (!(other instanceof PISAliq)) {
      return false;
    }
    return (
      this.CST === other.CST &&
      this.vBC === other.vBC &&
      this.pPIS === other.pPIS &&
      this.vPIS === other.vPIS
    );
  }

  public toJSON() {
    return {
      CST: this.CST,
      vBC: this.vBC,
      pPIS: this.pPIS,
      vPIS: this.vPIS,
    };
  }
}