const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS60 {
  public readonly orig;
  public readonly CST;
  public readonly vBCSTRet?: string | undefined;
  public readonly pST?: string | undefined;
  public readonly vICMSSubstituto?: string | undefined;
  public readonly vICMSSTRet?: string | undefined;
  public readonly vBCFCPSTRet?: string | undefined;
  public readonly pFCPST?: string | undefined;
  public readonly vFCPSTRet?: string | undefined;
  public readonly pRedBCEfet?: string | undefined;
  public readonly vBCEfet?: string | undefined;
  public readonly pICMSEfet?: string | undefined;
  public readonly vICMSEfet?: string | undefined;

  constructor(data: {
    orig: string ,
    CST: string,
    vBCSTRet?: string | undefined,
    pST?: string | undefined,
    vICMSSubstituto?: string | undefined,
    vICMSSTRet?: string | undefined,
    vBCFCPSTRet?: string | undefined,
    pFCPST?: string | undefined,
    vFCPSTRet?: string | undefined,
    pRedBCEfet?: string | undefined,
    vBCEfet?: string | undefined,
    pICMSEfet?: string | undefined,
    vICMSEfet?: string | undefined
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.vBCSTRet = data.vBCSTRet;
    this.pST = data.pST;
    this.vICMSSubstituto = data.vICMSSubstituto;
    this.vICMSSTRet = data.vICMSSTRet;
    this.vBCFCPSTRet = data.vBCFCPSTRet;
    this.pFCPST = data.pFCPST;
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

    if (this.vBCSTRet !== undefined && (typeof this.vBCSTRet !== 'string' || this.vBCSTRet.trim() === '')) {
      throw new Error('Valor da BC do ICMS Substituição Tributária retido anteriormente (vBCSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pST !== undefined && (typeof this.pST !== 'string' || this.pST.trim() === '')) {
      throw new Error('Alíquota suportada pelo consumidor final (pST) deve ser um número entre 0 e 100, se informada.');
    }

    if (this.vICMSSubstituto !== undefined && (typeof this.vICMSSubstituto !== 'string' || this.vICMSSubstituto.trim() === '')) {
      throw new Error('Valor do ICMS Substituição Tributária retido anteriormente (vICMSSubstituto) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSSTRet !== undefined && (typeof this.vICMSSTRet !== 'string' || this.vICMSSTRet.trim() === '')) {
      throw new Error('Valor do ICMS Substituição Tributária retido anteriormente (vICMSSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.vBCFCPSTRet !== undefined && (typeof this.vBCFCPSTRet !== 'string' || this.vBCFCPSTRet.trim() === '')) {
      throw new Error('Valor da BC do FCP ST retido anteriormente (vBCFCPSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== undefined && (typeof this.pFCPST !== 'string' || this.pFCPST.trim() === '')) {
      throw new Error('Alíquota do ICMS Substituição Tributária retido anteriormente (%) (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPSTRet !== undefined && (typeof this.vFCPSTRet !== 'string' || this.vFCPSTRet.trim() === '')) {
      throw new Error('Valor do FCP ST retido anteriormente (vFCPSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pRedBCEfet !== undefined && (typeof this.pRedBCEfet !== 'string' || this.pRedBCEfet.trim() === '')) {
      throw new Error('Percentual de redução da BC Efetiva (pRedBCEfet) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vBCEfet !== undefined && (typeof this.vBCEfet !== 'string' || this.vBCEfet.trim() === '')) {
      throw new Error('Valor da BC Efetiva (vBCEfet) deve ser um número não negativo, se informado.');
    }

    if (this.pICMSEfet !== undefined && (typeof this.pICMSEfet !== 'string' || this.pICMSEfet.trim() === '')) {
      throw new Error('Alíquota do ICMS Efetiva (pICMSEfet) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSEfet !== undefined && (typeof this.vICMSEfet !== 'string' || this.vICMSEfet.trim() === '')) {
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
      ICMS60: {
        orig: this.orig,
        CST: this.CST,
        vBCSTRet: this.vBCSTRet || undefined,
        pST: this.pST || undefined,
        vICMSSubstituto: this.vICMSSubstituto || undefined,
        vICMSSTRet: this.vICMSSTRet || undefined,
        vBCFCPSTRet: this.vBCFCPSTRet || undefined,
        pFCPST: this.pFCPST || undefined,
        vFCPSTRet: this.vFCPSTRet || undefined,
        pRedBCEfet: this.pRedBCEfet || undefined,
        vBCEfet: this.vBCEfet || undefined,
        pICMSEfet: this.pICMSEfet || undefined,
        vICMSEfet: this.vICMSEfet || undefined,
      }
    };
  }
}