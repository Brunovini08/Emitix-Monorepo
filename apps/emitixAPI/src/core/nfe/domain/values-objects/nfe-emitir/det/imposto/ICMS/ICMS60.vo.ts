import { DomainError } from "src/core/nfe/domain/errors/domain.error";

const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS60 {
  public readonly orig: string;
  public readonly CST: string;
  public readonly vBCSTRet?: number;
  public readonly pST?: number;
  public readonly vICMSSubstituto?: number;
  public readonly vICMSSTRet?: number;
  public readonly vBCFCPSTRet?: number;
  public readonly pFCPSTRet?: number;
  public readonly vFCPSTRet?: number;
  public readonly pRedBCEfet?: number;
  public readonly vBCEfet?: number;
  public readonly pICMSEfet?: number;
  public readonly vICMSEfet?: number;

  constructor(data: {
    orig: string,
    CST: string,
    vBCSTRet?: number,
    pST?: number,
    vICMSSubstituto?: number,
    vICMSSTRet?: number,
    vBCFCPSTRet?: number,
    pFCPSTRet?: number,
    vFCPSTRet?: number,
    pRedBCEfet?: number,
    vBCEfet?: number,
    pICMSEfet?: number,
    vICMSEfet?: number,
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.vBCSTRet = data.vBCSTRet;
    this.pST = data.pST;
    this.vICMSSubstituto = data.vICMSSubstituto;
    this.vICMSSTRet = data.vICMSSTRet;
    this.vBCFCPSTRet = data.vBCFCPSTRet;
    this.pFCPSTRet = data.pFCPSTRet;
    this.vFCPSTRet = data.vFCPSTRet;
    this.pRedBCEfet = data.pRedBCEfet;
    this.vBCEfet = data.vBCEfet;
    this.pICMSEfet = data.pICMSEfet;
    this.vICMSEfet = data.vICMSEfet;

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

    if (this.CST === undefined || typeof this.CST !== 'string' || this.CST.trim() === '') {
      throw new DomainError('Código de Situação Tributária (CST) do ICMS é obrigatório.');
    }
    if (this.CST !== '60') {
      throw new DomainError('CST para ICMS60 deve ser obrigatoriamente "60".');
    }

    if (this.vBCSTRet !== undefined && (typeof this.vBCSTRet !== 'number' || this.vBCSTRet < 0)) {
      throw new DomainError('Valor da BC do ICMS Substituição Tributária retido anteriormente (vBCSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pST !== undefined && (typeof this.pST !== 'number' || this.pST < 0 || this.pST > 100)) {
      throw new DomainError('Alíquota suportada pelo consumidor final (pST) deve ser um número entre 0 e 100, se informada.');
    }

    if (this.vICMSSubstituto !== undefined && (typeof this.vICMSSubstituto !== 'number' || this.vICMSSubstituto < 0)) {
      throw new DomainError('Valor do ICMS Substituição Tributária retido anteriormente (vICMSSubstituto) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSSTRet !== undefined && (typeof this.vICMSSTRet !== 'number' || this.vICMSSTRet < 0)) {
      throw new DomainError('Valor do ICMS Substituição Tributária retido anteriormente (vICMSSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.vBCFCPSTRet !== undefined && (typeof this.vBCFCPSTRet !== 'number' || this.vBCFCPSTRet < 0)) {
      throw new DomainError('Valor da BC do ICMS Substituição Tributária retido anteriormente (vBCFCPSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPSTRet !== undefined && (typeof this.pFCPSTRet !== 'number' || this.pFCPSTRet < 0 || this.pFCPSTRet > 100)) {
      throw new DomainError('Alíquota do ICMS Substituição Tributária retido anteriormente (pFCPSTRet) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPSTRet !== undefined && (typeof this.vFCPSTRet !== 'number' || this.vFCPSTRet < 0)) {
      throw new DomainError('Valor do ICMS Substituição Tributária retido anteriormente (vFCPSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pRedBCEfet !== undefined && (typeof this.pRedBCEfet !== 'number' || this.pRedBCEfet < 0 || this.pRedBCEfet > 100)) {
      throw new DomainError('Percentual de redução da BC efetiva (pRedBCEfet) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vBCEfet !== undefined && (typeof this.vBCEfet !== 'number' || this.vBCEfet < 0)) {
      throw new DomainError('Valor da BC efetiva (vBCEfet) deve ser um número não negativo, se informado.');
    }

    if (this.pICMSEfet !== undefined && (typeof this.pICMSEfet !== 'number' || this.pICMSEfet < 0 || this.pICMSEfet > 100)) {
      throw new DomainError('Alíquota do ICMS efetiva (pICMSEfet) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSEfet !== undefined && (typeof this.vICMSEfet !== 'number' || this.vICMSEfet < 0)) {
      throw new DomainError('Valor do ICMS efetivo (vICMSEfet) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other: ICMS60): boolean {
    if (!(other instanceof ICMS60)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.vBCSTRet === other.vBCSTRet &&
      this.pST === other.pST &&
      this.vICMSSubstituto === other.vICMSSubstituto &&
      this.vICMSSTRet === other.vICMSSTRet &&
      this.vBCFCPSTRet === other.vBCFCPSTRet &&
      this.pFCPSTRet === other.pFCPSTRet &&
      this.vFCPSTRet === other.vFCPSTRet &&
      this.pRedBCEfet === other.pRedBCEfet &&
      this.vBCEfet === other.vBCEfet &&
      this.pICMSEfet === other.pICMSEfet &&
      this.vICMSEfet === other.vICMSEfet
    );
  }

  public toJSON() {
    return {
      ICMS60: {
        orig: this.orig,
        CST: this.CST,
        vBCSTRet: this.vBCSTRet?.toFixed(2),
        pST: this.pST?.toFixed(2),
        vICMSSubstituto: this.vICMSSubstituto?.toFixed(2),
        vICMSSTRet: this.vICMSSTRet?.toFixed(2),
        vBCFCPSTRet: this.vBCFCPSTRet?.toFixed(2),
        pFCPSTRet: this.pFCPSTRet?.toFixed(2),
        vFCPSTRet: this.vFCPSTRet?.toFixed(2),
        pRedBCEfet: this.pRedBCEfet?.toFixed(2),
        vBCEfet: this.vBCEfet?.toFixed(2),
        pICMSEfet: this.pICMSEfet?.toFixed(2),
        vICMSEfet: this.vICMSEfet?.toFixed(2),
      }
    };
  }
}