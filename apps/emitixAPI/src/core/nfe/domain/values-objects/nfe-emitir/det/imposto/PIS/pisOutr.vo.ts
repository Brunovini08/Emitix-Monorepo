import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class PISOutr {
  public readonly CST;
  public readonly vBC;
  public readonly pPis;
  public readonly qBCProd;
  public readonly vAliqProd;
  public readonly vPIS;

  constructor(data: { CST: string, vBC: number, pPis: number, qBCProd: number, vAliqProd: number, vPIS: number }) {
    this.CST = data.CST;
    this.vBC = data.vBC ?? null;
    this.pPis = data.pPis ?? null;
    this.qBCProd = data.qBCProd ?? null;
    this.vAliqProd = data.vAliqProd ?? null;
    this.vPIS = data.vPIS;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    const allowedCST = [
      '49', '50', '51', '53', '54', '55', '56', '60', '61', '62', '63',
      '64', '65', '66', '67', '70', '71', '72', '73', '74', '75', '98', '99',
    ];
    if (typeof this.CST !== 'string' || !allowedCST.includes(this.CST)) {
      throw new DomainError('Código de Situação Tributária do PIS (CST) é obrigatório e deve ser um dos valores permitidos.');
    }

    const isPercentageBased = this.vBC !== null || this.pPis !== null;
    const isQuantityBased = this.qBCProd !== null || this.vAliqProd !== null;

    if (isPercentageBased && isQuantityBased) {
      throw new DomainError('Apenas um tipo de cálculo (percentual ou por quantidade) pode ser informado.');
    }

    if (!isPercentageBased && !isQuantityBased) {
      throw new DomainError('É necessário informar os dados para cálculo percentual (vBC e pPis) ou por quantidade (qBCProd e vAliqProd).');
    }

    if (isPercentageBased) {
      if (typeof this.vBC !== 'number' || this.vBC < 0) {
        throw new DomainError('Valor da BC do PIS (vBC) é obrigatório e deve ser um número não negativo para cálculo percentual.');
      }
      if (typeof this.pPis !== 'number' || this.pPis < 0 || this.pPis > 100) {
        throw new DomainError('Alíquota do PIS (em percentual) (pPis) é obrigatória e deve ser um número entre 0 e 100 para cálculo percentual.');
      }
    }

    if (isQuantityBased) {
      if (typeof this.qBCProd !== 'number' || this.qBCProd < 0) {
        throw new DomainError('Quantidade Vendida (qBCProd) é obrigatória e deve ser um número não negativo para cálculo por quantidade.');
      }
      if (typeof this.vAliqProd !== 'number' || this.vAliqProd < 0) {
        throw new DomainError('Alíquota do PIS (em reais) (vAliqProd) é obrigatória e deve ser um número não negativo para cálculo por quantidade.');
      }
    }

    if (typeof this.vPIS !== 'number' || this.vPIS < 0) {
      throw new DomainError('Valor do PIS (vPIS) é obrigatório e deve ser um número não negativo.');
    }
  }

  public equals(other) {
    if (!(other instanceof PISOutr)) {
      return false;
    }
    return (
      this.CST === other.CST &&
      this.vBC === other.vBC &&
      this.pPis === other.pPis &&
      this.qBCProd === other.qBCProd &&
      this.vAliqProd === other.vAliqProd &&
      this.vPIS === other.vPIS
    );
  }

  public toJSON() {
    return {
      CST: this.CST,
      vBC: this.vBC.toFixed(2),
      pPis: this.pPis.toFixed(2),
      qBCProd: this.qBCProd.toFixed(4),
      vAliqProd: this.vAliqProd.toFixed(4),
      vPIS: this.vPIS.toFixed(2),
    };
  }
}