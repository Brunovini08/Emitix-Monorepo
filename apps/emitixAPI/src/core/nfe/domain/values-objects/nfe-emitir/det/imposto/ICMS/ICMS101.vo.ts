import { DomainError } from "src/core/nfe/domain/errors/domain.error";

const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMSSN101 {
  public readonly orig;
  public readonly CSOSN;
  public readonly pCredSN;
  public readonly vCredICMSSN;

  constructor(data: {
    orig: string,
    CSOSN: string,
    pCredSN: string,
    vCredICMSSN: string
  }) {
    this.orig = data.orig;
    this.CSOSN = data.CSOSN;
    this.pCredSN = data.pCredSN;
    this.vCredICMSSN = data.vCredICMSSN;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (this.orig === undefined || !(Object.values(TorigEnum).includes(this.orig))) {
      throw new DomainError(`
        Origem da mercadoria (orig) é obrigatória e deve ser um dos seguintes valores:
        ${Object.values(TorigEnum).join(', ')} (0 - Nacional, 1 - Estrangeira - Importação direta, 2 - Estrangeira - Adquirida no mercado interno)
      `);
    }

    if (this.CSOSN === undefined || typeof this.CSOSN !== 'string' || this.CSOSN.trim() === '') {
      throw new DomainError('CSOSN (Código de Situação da Operação – Simples Nacional) é obrigatório.');
    }
    if (this.CSOSN !== '101') {
      throw new DomainError('CSOSN para ICMS101 deve ser obrigatoriamente "101".');
    }

    if (typeof this.pCredSN !== 'string' || this.pCredSN.trim() === '') {
      throw new DomainError('Alíquota aplicável de cálculo do crédito (pCredSN) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vCredICMSSN !== 'string' || this.vCredICMSSN.trim() === '') {
      throw new DomainError('Valor do crédito do ICMS (vCredICMSSN) é obrigatório e deve ser um número não negativo.');
    }
  }

  public equals(other) {
    if (!(other instanceof ICMSSN101)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CSOSN === other.CSOSN &&
      this.pCredSN === other.pCredSN &&
      this.vCredICMSSN === other.vCredICMSSN
    );
  }

  public toJSON() {
    return {
      ICMSSN101: {
        orig: this.orig,
        CSOSN: this.CSOSN,
        pCredSN: this.pCredSN,
        vCredICMSSN: this.vCredICMSSN,
      }
    };
  }
}