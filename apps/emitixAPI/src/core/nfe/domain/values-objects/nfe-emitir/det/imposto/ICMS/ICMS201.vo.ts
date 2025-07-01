const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMSSN201 {
  public readonly orig;
  public readonly CSOSN;
  public readonly modBCST;
  public readonly pMVAST;
  public readonly pRedBCST;
  public readonly vBCST;
  public readonly pICMSST;
  public readonly vICMSST;
  public readonly vBCFCPST;
  public readonly pFCPST;
  public readonly vFCPST;
  public readonly pCredSN;
  public readonly vCredICMSSN;

  constructor(data: {
    orig: string,
    CSOSN: string,
    modBCST: string,
    pMVAST: string,
    pRedBCST: string,
    vBCST: string,
    pICMSST: string,
    vICMSST: string,
    vBCFCPST: string,
    pFCPST: string,
    vFCPST: string,
    pCredSN: string,
    vCredICMSSN: string,
  }) {
    this.orig = data.orig;
    this.CSOSN = data.CSOSN;
    this.modBCST = data.modBCST;
    this.pMVAST = data.pMVAST ?? null;
    this.pRedBCST = data.pRedBCST ?? null;
    this.vBCST = data.vBCST;
    this.pICMSST = data.pICMSST;
    this.vICMSST = data.vICMSST;
    this.vBCFCPST = data.vBCFCPST ?? null;
    this.pFCPST = data.pFCPST ?? null;
    this.vFCPST = data.vFCPST ?? null;
    this.pCredSN = data.pCredSN ?? null;
    this.vCredICMSSN = data.vCredICMSSN ?? null;

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

    if (this.CSOSN === undefined || typeof this.CSOSN !== 'string' || this.CSOSN.trim() === '') {
      throw new Error('CSOSN (Código de Situação da Operação – Simples Nacional) é obrigatório.');
    }
    if (this.CSOSN !== '201') {
      throw new Error('CSOSN para ICMS201 deve ser obrigatoriamente "201".');
    }

    const allowedModBCST = ['0', '1', '2', '3', '4', '5', '6'];
    if (this.modBCST === undefined || typeof this.modBCST !== 'string' || !allowedModBCST.includes(this.modBCST)) {
      throw new Error(`
        Modalidade de determinação da BV do ICMS ST (modBCST) é obrigatória e deve ser uma das seguintes:
        0 - Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor);
        4 - Margem Valor Agregado (%); 5 - Pauta (valor); 6 - Valor da Operação
      `);
    }

    if (this.pMVAST !== null && (typeof this.pMVAST !== 'string' || this.pMVAST.trim() === '')) {
      throw new Error('Percentual da Margem de Valor Adicionado (pMVAST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pRedBCST !== null && (typeof this.pRedBCST !== 'string' || this.pRedBCST.trim() === '')) {
      throw new Error('Percentual de redução da BC do ICMS ST (pRedBCST) deve ser um número entre 0 e 100, se informado.');
    }

    if (typeof this.vBCST !== 'string' || this.vBCST.trim() === '') {
      throw new Error('Valor da BC do ICMS ST (vBCST) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pICMSST !== 'string' || this.pICMSST.trim() === '') {
      throw new Error('Alíquota do ICMS ST (pICMSST) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vICMSST !== 'string' || this.vICMSST.trim() === '') {
      throw new Error('Valor do ICMS ST (vICMSST) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCPST !== null && (typeof this.vBCFCPST !== 'string' || this.vBCFCPST.trim() === '')) {
      throw new Error('Valor da BC do ICMS FCP (vBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== null && (typeof this.pFCPST !== 'string' || this.pFCPST.trim() === '')) {
      throw new Error('Alíquota do ICMS FCP (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPST !== null && (typeof this.vFCPST !== 'string' || this.vFCPST.trim() === '')) {
      throw new Error('Valor do ICMS FCP (vFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pCredSN !== null && (typeof this.pCredSN !== 'string' || this.pCredSN.trim() === '')) {
      throw new Error('Alíquota do ICMS ST (pCredSN) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vCredICMSSN !== null && (typeof this.vCredICMSSN !== 'string' || this.vCredICMSSN.trim() === '')) {
      throw new Error('Valor do ICMS ST (vCredICMSSN) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other) {
    if (!(other instanceof ICMSSN201)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CSOSN === other.CSOSN &&
      this.modBCST === other.modBCST &&
      this.pMVAST === other.pMVAST &&
      this.pRedBCST === other.pRedBCST &&
      this.vBCST === other.vBCST &&
      this.pICMSST === other.pICMSST &&
      this.vICMSST === other.vICMSST &&
      this.vBCFCPST === other.vBCFCPST &&
      this.pFCPST === other.pFCPST &&
      this.vFCPST === other.vFCPST &&
      this.pCredSN === other.pCredSN &&
      this.vCredICMSSN === other.vCredICMSSN
    );
  }

  public toJSON() {
    return {
      ICMSSN201: {
        orig: this.orig,
        CSOSN: this.CSOSN,
        modBCST: this.modBCST,
        pMVAST: this.pMVAST,
        pRedBCST: this.pRedBCST,
        vBCST: this.vBCST,
        pICMSST: this.pICMSST,
        vICMSST: this.vICMSST,
        vBCFCPST: this.vBCFCPST,
        pFCPST: this.pFCPST,
        vFCPST: this.vFCPST,
        pCredSN: this.pCredSN,
        vCredICMSSN: this.vCredICMSSN,
      }
    };
  }
}