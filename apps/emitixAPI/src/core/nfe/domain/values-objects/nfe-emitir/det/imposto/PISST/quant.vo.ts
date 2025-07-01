export class Quant {
  public readonly qBCProd;
  public readonly vAliqProd;

  constructor(data: { qBCProd: number, vAliqProd: number }) {
    this.qBCProd = data.qBCProd;
    this.vAliqProd = data.vAliqProd;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (typeof this.qBCProd !== 'number' || this.qBCProd < 0) {
      throw new Error('Quantidade Vendida (qBCProd) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.vAliqProd !== 'number' || this.vAliqProd < 0) {
      throw new Error('Alíquota do PIS ST (em reais) (vAliqProd) é obrigatória e deve ser um número não negativo.');
    }
  }

  public equals(other) {
    if (!(other instanceof Quant)) {
      return false;
    }
    return (
      this.qBCProd === other.qBCProd &&
      this.vAliqProd === other.vAliqProd
    );
  }

  public toJSON() {
    return {
      qBCProd: this.qBCProd.toFixed(4),
      vAliqProd: this.vAliqProd.toFixed(4),
    };
  }
}