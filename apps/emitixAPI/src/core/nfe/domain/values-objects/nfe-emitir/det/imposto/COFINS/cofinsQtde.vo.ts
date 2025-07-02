import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class COFINSQtde {
  public readonly CST;
  public readonly qBCProd;
  public readonly vAliqProd;
  public readonly vCOFINS;

  constructor(data: { CST: string, qBCProd: number, vAliqProd: number, vCOFINS: number }) {
    this.CST = data.CST;
    this.qBCProd = data.qBCProd;
    this.vAliqProd = data.vAliqProd;
    this.vCOFINS = data.vCOFINS;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (typeof this.CST !== 'string' || this.CST !== '03') {
      throw new DomainError('Código de Situação Tributária do COFINS (CST) é obrigatório e deve ser "03".');
    }

    if (typeof this.qBCProd !== 'number' || this.qBCProd < 0) {
      throw new DomainError('Quantidade Vendida (qBCProd) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.vAliqProd !== 'number' || this.vAliqProd < 0) {
      throw new DomainError('Alíquota do COFINS (em reais) (vAliqProd) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.vCOFINS !== 'number' || this.vCOFINS < 0) {
      throw new DomainError('Valor do COFINS (vCOFINS) é obrigatório e deve ser um número não negativo.');
    }
  }

  public equals(other) {
    if (!(other instanceof COFINSQtde)) {
      return false;
    }
    return (
      this.CST === other.CST &&
      this.qBCProd === other.qBCProd &&
      this.vAliqProd === other.vAliqProd &&
      this.vCOFINS === other.vCOFINS
    );
  }

  public toJSON() {
    return {
      CST: this.CST,
      qBCProd: this.qBCProd.toFixed(4),
      vAliqProd: this.vAliqProd.toFixed(4),
      vCOFINS: this.vCOFINS.toFixed(2),
    };
  }
}