const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMSSN500 {
  public readonly orig;
  public readonly CSOSN;
  public readonly vBCSTRet;
  public readonly pST;
  public readonly vICMSSubstituto;
  public readonly vICMSSTRet;
  public readonly vBCFCPSTRet;
  public readonly pFCPSTRet;
  public readonly vFCPSTRet;
  public readonly pRedBCEfet;
  public readonly vBCEfet;
  public readonly pICMSEfet;
  public readonly vICMSEfet;

  constructor(data: {
    orig: string,
    CSOSN: string,
    vBCSTRet: string,
    pST: string,
    vICMSSubstituto: string,
    vICMSSTRet: string,
    vBCFCPSTRet: string,
    pFCPSTRet: string,
    vFCPSTRet: string,
    pRedBCEfet: string,
    vBCEfet: string,
    pICMSEfet: string,
    vICMSEfet: string,
  }) {
    this.orig = data.orig;
    this.CSOSN = data.CSOSN;
    this.vBCSTRet = data.vBCSTRet ?? null;
    this.pST = data.pST ?? null;
    this.vICMSSubstituto = data.vICMSSubstituto ?? null;
    this.vICMSSTRet = data.vICMSSTRet ?? null;
    this.vBCFCPSTRet = data.vBCFCPSTRet ?? null;
    this.pFCPSTRet = data.pFCPSTRet ?? null;
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

    const allowedCSOSN = ['202', '203']; // The DTO uses '202' and '203' for CSOSN, even though the message implies 500. Sticking to DTO for now.
    if (this.CSOSN === undefined || typeof this.CSOSN !== 'string' || !allowedCSOSN.includes(this.CSOSN)) {
      throw new Error(`
        CSOSN (Código de Situação da Operação – Simples Nacional) é obrigatório e deve ser '202' ou '203' for this context (ICMSSN500).
      `);
    }

    if (this.vBCSTRet !== null && (typeof this.vBCSTRet !== 'string' || this.vBCSTRet.trim() === '')) {
      throw new Error('Valor da BC do ICMS Substituição Tributária retido anteriormente (vBCSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pST !== null && (typeof this.pST !== 'string' || this.pST.trim() === '')) {
      throw new Error('Alíquota suportada pelo consumidor final (pST) deve ser um número entre 0 e 100, se informada.');
    }

    if (this.vICMSSubstituto !== null && (typeof this.vICMSSubstituto !== 'string' || this.vICMSSubstituto.trim() === '')) {
      throw new Error('Valor do ICMS Substituição Tributária retido anteriormente (vICMSSubstituto) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSSTRet !== null && (typeof this.vICMSSTRet !== 'string' || this.vICMSSTRet.trim() === '')) {
      throw new Error('Valor do ICMS Substituição Tributária retido anteriormente (vICMSSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.vBCFCPSTRet !== null && (typeof this.vBCFCPSTRet !== 'string' || this.vBCFCPSTRet.trim() === '')) {
      throw new Error('Valor da BC do ICMS FCP ST retido anteriormente (vBCFCPSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPSTRet !== null && (typeof this.pFCPSTRet !== 'string' || this.pFCPSTRet.trim() === '')) {
      throw new Error('Alíquota do ICMS FCP ST retido anteriormente (pFCPSTRet) deve ser um número entre 0 e 100, se informada.');
    }

    if (this.vFCPSTRet !== null && (typeof this.vFCPSTRet !== 'string' || this.vFCPSTRet.trim() === '')) {
      throw new Error('Valor do ICMS FCP ST retido anteriormente (vFCPSTRet) deve ser um número não negativo, se informado.');
    }

    if (this.pRedBCEfet !== null && (typeof this.pRedBCEfet !== 'string' || this.pRedBCEfet.trim() === '')) {
      throw new Error('Percentual de redução da BC efetiva (pRedBCEfet) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vBCEfet !== null && (typeof this.vBCEfet !== 'string' || this.vBCEfet.trim() === '')) {
      throw new Error('Valor da BC efetiva do ICMS (vBCEfet) deve ser um número não negativo, se informado.');
    }

    if (this.pICMSEfet !== null && (typeof this.pICMSEfet !== 'string' || this.pICMSEfet.trim() === '')) {
      throw new Error('Alíquota do ICMS efetivo (pICMSEfet) deve ser um número entre 0 e 100, se informada.');
    }

    if (this.vICMSEfet !== null && (typeof this.vICMSEfet !== 'string' || this.vICMSEfet.trim() === '')) {
      throw new Error('Valor do ICMS efetivo (vICMSEfet) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other) {
    if (!(other instanceof ICMSSN500)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CSOSN === other.CSOSN &&
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
      ICMSSN500: {
        orig: this.orig,
        CSOSN: this.CSOSN,
        vBCSTRet: this.vBCSTRet,
        pST: this.pST,
        vICMSSubstituto: this.vICMSSubstituto,
        vICMSSTRet: this.vICMSSTRet,
        vBCFCPSTRet: this.vBCFCPSTRet,
        pFCPSTRet: this.pFCPSTRet,
        vFCPSTRet: this.vFCPSTRet,
        pRedBCEfet: this.pRedBCEfet,
        vBCEfet: this.vBCEfet,
        pICMSEfet: this.pICMSEfet,
        vICMSEfet: this.vICMSEfet,
      }
    };
  }
}