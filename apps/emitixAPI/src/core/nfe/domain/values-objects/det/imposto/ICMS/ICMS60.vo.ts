const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS60 {
  public readonly orig;
  public readonly CST;
  public readonly vBCSTRet;
  public readonly pST;
  public readonly vICMSSubstituto;
  public readonly vICMSSTRet;
  public readonly vBCFCPSTRet;
  public readonly pFCPST;
  public readonly vFCPSTRet;
  public readonly pRedBCEfet;
  public readonly vBCEfet;
  public readonly pICMSEfet;
  public readonly vICMSEfet;

  constructor(data) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.vBCSTRet = data.vBCSTRet ?? null;
    this.pST = data.pST ?? null;
    this.vICMSSubstituto = data.vICMSSubstituto ?? null;
    this.vICMSSTRet = data.vICMSSTRet ?? null;
    this.vBCFCPSTRet = data.vBCFCPSTRet ?? null;
    this.pFCPST = data.pFCPST ?? null;
    this.vFCPSTRet = data.vFCPSTRet ?? null;
    this.pRedBCEfet = data.pRedBCEfet ?? null;
    this.vBCEfet = data.vBCEfet ?? null;
    this.pICMSEfet = data.pICMSEfet ?? null;
    this.vICMSEfet = data.vICMSEfet ?? null;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (this.orig === undefined || !(Object.values(TorigEnum).includes(this.orig))) {
      throw new Error(`
        Origem da mercadoria (orig) é obrigatória e deve ser um dos seguintes valores:
        ${Object.values(TorigEnum).join(', ')} (0 - Nacional, 1 - Estrangeira - Importação direta, 2 - Estrangeira - Adquirida no mercado interno)
      `);
    }

    if (this.CST === undefined || typeof this.CST !== 'string' || this.CST.trim() === '') {
      throw new Error('Código de Situação Tributária (CST) do ICMS é obrigatório.');
    }
    if (this.CST !== '60') {
      throw new Error('CST para ICMS60 deve ser obrigatoriamente "60".');
    }

    if (this.vBCSTRet !== null && (typeof this.vBCSTRet !== 'number' || this.vBCSTRet < 0)) {
      throw new Error('Valor da BC do ICMS Substituição Tributária retido anteriormente (vBCSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pST !== null && (typeof this.pST !== 'number' || this.pST < 0 || this.pST > 100)) {
      throw new Error('Alíquota suportada pelo consumidor final (pST) deve ser um número entre 0 e 100, se informada.');
    }

    if (this.vICMSSubstituto !== null && (typeof this.vICMSSubstituto !== 'number' || this.vICMSSubstituto < 0)) {
      throw new Error('Valor do ICMS Substituição Tributária retido anteriormente (vICMSSubstituto) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSSTRet !== null && (typeof this.vICMSSTRet !== 'number' || this.vICMSSTRet < 0)) {
      throw new Error('Valor do ICMS Substituição Tributária retido anteriormente (vICMSSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.vBCFCPSTRet !== null && (typeof this.vBCFCPSTRet !== 'number' || this.vBCFCPSTRet < 0)) {
      throw new Error('Valor da BC do FCP ST retido anteriormente (vBCFCPSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== null && (typeof this.pFCPST !== 'number' || this.pFCPST < 0 || this.pFCPST > 100)) {
      throw new Error('Alíquota do ICMS Substituição Tributária retido anteriormente (%) (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPSTRet !== null && (typeof this.vFCPSTRet !== 'number' || this.vFCPSTRet < 0)) {
      throw new Error('Valor do FCP ST retido anteriormente (vFCPSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pRedBCEfet !== null && (typeof this.pRedBCEfet !== 'number' || this.pRedBCEfet < 0 || this.pRedBCEfet > 100)) {
      throw new Error('Percentual de redução da BC Efetiva (pRedBCEfet) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vBCEfet !== null && (typeof this.vBCEfet !== 'number' || this.vBCEfet < 0)) {
      throw new Error('Valor da BC Efetiva (vBCEfet) deve ser um número não negativo, se informado.');
    }

    if (this.pICMSEfet !== null && (typeof this.pICMSEfet !== 'number' || this.pICMSEfet < 0 || this.pICMSEfet > 100)) {
      throw new Error('Alíquota do ICMS Efetiva (pICMSEfet) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSEfet !== null && (typeof this.vICMSEfet !== 'number' || this.vICMSEfet < 0)) {
      throw new Error('Valor do ICMS Efetivo (vICMSEfet) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other) {
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
      this.pFCPST === other.pFCPST &&
      this.vFCPSTRet === other.vFCPSTRet &&
      this.pRedBCEfet === other.pRedBCEfet &&
      this.vBCEfet === other.vBCEfet &&
      this.pICMSEfet === other.pICMSEfet &&
      this.vICMSEfet === other.vICMSEfet
    );
  }

  public toJSON() {
    return {
      orig: this.orig,
      CST: this.CST,
      vBCSTRet: this.vBCSTRet,
      pST: this.pST,
      vICMSSubstituto: this.vICMSSubstituto,
      vICMSSTRet: this.vICMSSTRet,
      vBCFCPSTRet: this.vBCFCPSTRet,
      pFCPST: this.pFCPST,
      vFCPSTRet: this.vFCPSTRet,
      pRedBCEfet: this.pRedBCEfet,
      vBCEfet: this.vBCEfet,
      pICMSEfet: this.pICMSEfet,
      vICMSEfet: this.vICMSEfet,
    };
  }
}