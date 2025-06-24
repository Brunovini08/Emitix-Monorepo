export class PISQtde {
  public readonly CST;
  public readonly qBCProd;
  public readonly vAliqProd;
  public readonly vPIS;

  constructor(data: {
    CST: string
    qBCProd: number
    vAliqProd: number
    vPIS: number
  }) {
    this.CST = data.CST;
    this.qBCProd = data.qBCProd;
    this.vAliqProd = data.vAliqProd;
    this.vPIS = data.vPIS;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (typeof this.CST !== 'string' || this.CST !== '03') {
      throw new Error('Código de Situação Tributária do PIS (CST) é obrigatório e deve ser "03".');
    }

    if (typeof this.qBCProd !== 'number' || this.qBCProd < 0) {
      throw new Error('Quantidade Vendida (qBCProd) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.vAliqProd !== 'number' || this.vAliqProd < 0) {
      throw new Error('Alíquota do PIS (em reais) (vAliqProd) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.vPIS !== 'number' || this.vPIS < 0) {
      throw new Error('Valor do PIS (vPIS) é obrigatório e deve ser um número não negativo.');
    }
  }

  public equals(other) {
    if (!(other instanceof PISQtde)) {
      return false;
    }
    return (
      this.CST === other.CST &&
      this.qBCProd === other.qBCProd &&
      this.vAliqProd === other.vAliqProd &&
      this.vPIS === other.vPIS
    );
  }

  public toJSON() {
    return {
      CST: this.CST,
      qBCProd: this.qBCProd,
      vAliqProd: this.vAliqProd,
      vPIS: this.vPIS,
    };
  }
}