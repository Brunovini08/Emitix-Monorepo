import { DomainError } from "src/core/nfe/domain/errors/domain.error";

const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMSST {
  public readonly orig: string;
  public readonly CST: string;
  public readonly vBCSTRet: number;
  public readonly pST: number;
  public readonly vICMSSubstituto: number;
  public readonly vICMSSTRet: number;
  public readonly vBCFCPSTRet?: number;
  public readonly pFCPSTRet?: number;
  public readonly vFCPSTRet?: number;

  constructor(data: {
    orig: string,
    CST: string,
    vBCSTRet: number,
    pST: number,
    vICMSSubstituto: number,
    vICMSSTRet: number,
    vBCFCPSTRet?: number,
    pFCPSTRet?: number,
    vFCPSTRet?: number,
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

    if (typeof this.vBCSTRet !== 'number' || this.vBCSTRet < 0) {
      throw new DomainError('Valor da BC do ICMS ST retido (vBCSTRet) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pST !== 'number' || this.pST < 0 || this.pST > 100) {
      throw new DomainError('Alíquota do ICMS ST (pST) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vICMSSubstituto !== 'number' || this.vICMSSubstituto < 0) {
      throw new DomainError('Valor do ICMS Substituição Tributária (vICMSSubstituto) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.vICMSSTRet !== 'number' || this.vICMSSTRet < 0) {
      throw new DomainError('Valor do ICMS ST retido (vICMSSTRet) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCPSTRet !== undefined && (typeof this.vBCFCPSTRet !== 'number' || this.vBCFCPSTRet < 0)) {
      throw new DomainError('Valor da BC do FCP ST retido (vBCFCPSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPSTRet !== undefined && (typeof this.pFCPSTRet !== 'number' || this.pFCPSTRet < 0 || this.pFCPSTRet > 100)) {
      throw new DomainError('Alíquota do FCP ST retido (pFCPSTRet) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPSTRet !== undefined && (typeof this.vFCPSTRet !== 'number' || this.vFCPSTRet < 0)) {
      throw new DomainError('Valor do FCP ST retido (vFCPSTRet) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other: ICMSST): boolean {
    if (!(other instanceof ICMSST)) {
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
      this.vFCPSTRet === other.vFCPSTRet
    );
  }

  public toJSON() {
    return {
      ICMSST: {
        orig: this.orig,
        CST: this.CST,
        vBCSTRet: this.vBCSTRet.toFixed(2),
        pST: this.pST.toFixed(2),
        vICMSSubstituto: this.vICMSSubstituto.toFixed(2),
        vICMSSTRet: this.vICMSSTRet.toFixed(2),
        vBCFCPSTRet: this.vBCFCPSTRet?.toFixed(2),
        pFCPSTRet: this.pFCPSTRet?.toFixed(2),
        vFCPSTRet: this.vFCPSTRet?.toFixed(2),
      }
    };
  }
}