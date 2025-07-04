import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class COFINSAliq {
  public readonly CST;
  public readonly vBC;
  public readonly pCOFINS;
  public readonly vCOFINS;

  constructor(data: { CST: string, vBC: number, pCOFINS: number, vCOFINS: number }) {
    this.CST = data.CST;
    this.vBC = data.vBC;
    this.pCOFINS = data.pCOFINS;
    this.vCOFINS = data.vCOFINS;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    const allowedCST = ['01', '02'];
    if (typeof this.CST !== 'string' || !allowedCST.includes(this.CST)) {
      throw new DomainError(`
        Código de Situação Tributária do COFINS (CST) é obrigatório e deve ser "01" ou "02":
        01 - Operação Tributável - Base de Cálculo = Valor da Operação Alíquota Normal (Cumulativo/Não Cumulativo);
        02 - Operação Tributável - Base de Cálculo = Valor da Operação (Alíquota Diferenciada).
      `);
    }

    if (typeof this.vBC !== 'number' || this.vBC < 0) {
      throw new DomainError('Valor da BC do COFINS (vBC) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pCOFINS !== 'number' || this.pCOFINS < 0 || this.pCOFINS > 100) {
      throw new DomainError('Alíquota do COFINS (em percentual) (pCOFINS) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vCOFINS !== 'number' || this.vCOFINS < 0) {
      throw new DomainError('Valor do COFINS (vCOFINS) é obrigatório e deve ser um número não negativo.');
    }
  }

  public equals(other) {
    if (!(other instanceof COFINSAliq)) {
      return false;
    }
    return (
      this.CST === other.CST &&
      this.vBC === other.vBC &&
      this.pCOFINS === other.pCOFINS &&
      this.vCOFINS === other.vCOFINS
    );
  }

  public toJSON() {
    return {
      CST: this.CST,
      vBC: this.vBC.toFixed(2),
      pCOFINS: this.pCOFINS.toFixed(2),
      vCOFINS: this.vCOFINS.toFixed(2),
    };
  }
}