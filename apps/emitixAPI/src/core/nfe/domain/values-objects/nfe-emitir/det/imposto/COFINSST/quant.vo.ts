import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class Quant {
  public readonly qBCProd: number;
  public readonly vAliqProd: number;

  constructor(data: { qBCProd: number, vAliqProd: number }) {
    this.qBCProd = data.qBCProd;
    this.vAliqProd = data.vAliqProd;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (typeof this.qBCProd !== 'number' || this.qBCProd < 0) {
      throw new DomainError('Quantidade Vendida (qBCProd) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.vAliqProd !== 'number' || this.vAliqProd < 0) {
      throw new DomainError('Alíquota do COFINS ST (em reais) (vAliqProd) é obrigatória e deve ser um número não negativo.');
    }
  }

  public equals(other: Quant | undefined): boolean {
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