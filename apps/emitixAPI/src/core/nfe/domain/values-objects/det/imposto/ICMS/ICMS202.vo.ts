const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMSSN202 {
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

  constructor(data) {
    this.orig = data.orig;
    this.CSOSN = data.CSOSN;
    this.modBCST = data.modBCST;
    this.pMVAST = data.pMVAST ?? null;
    this.pRedBCST = data.pRedBCST ?? null;
    this.vBCST = data.vBCST ?? null; // vBCST is optional in the DTO, so it should be optional here too.
    this.pICMSST = data.pICMSST;
    this.vICMSST = data.vICMSST;
    this.vBCFCPST = data.vBCFCPST ?? null;
    this.pFCPST = data.pFCPST ?? null;
    this.vFCPST = data.vFCPST ?? null;

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

    const allowedCSOSN = ['202', '203'];
    if (this.CSOSN === undefined || typeof this.CSOSN !== 'string' || !allowedCSOSN.includes(this.CSOSN)) {
      throw new Error(`
        CSOSN (Código de Situação da Operação – Simples Nacional) é obrigatório e deve ser '202' ou '203'.
        202 - Tributada pelo Simples Nacional sem permissão de crédito e com cobrança do ICMS por Substituição Tributária;
        203 - Isenção do ICMS nos Simples Nacional para faixa de receita bruta e com cobrança do ICMS por Substituição Tributária.
      `);
    }

    const allowedModBCST = ['0', '1', '2', '3', '4', '5', '6'];
    if (this.modBCST === undefined || typeof this.modBCST !== 'string' || !allowedModBCST.includes(this.modBCST)) {
      throw new Error(`
        Modalidade de determinação da BC do ICMS ST (modBCST) é obrigatória e deve ser uma das seguintes:
        0 - Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor);
        4 - Margem Valor Agregado (%); 5 - Pauta (valor); 6 - Valor da Operação.
      `);
    }

    if (this.pMVAST !== null && (typeof this.pMVAST !== 'number' || this.pMVAST < 0 || this.pMVAST > 100)) {
      throw new Error('Percentual da Margem de Valor Adicionado (pMVAST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pRedBCST !== null && (typeof this.pRedBCST !== 'number' || this.pRedBCST < 0 || this.pRedBCST > 100)) {
      throw new Error('Percentual de redução da BC do ICMS ST (pRedBCST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vBCST !== null && (typeof this.vBCST !== 'number' || this.vBCST < 0)) {
      throw new Error('Valor da BC do ICMS ST (vBCST) deve ser um número não negativo, se informado.');
    }

    if (typeof this.pICMSST !== 'number' || this.pICMSST < 0 || this.pICMSST > 100) {
      throw new Error('Alíquota do ICMS ST (pICMSST) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vICMSST !== 'number' || this.vICMSST < 0) {
      throw new Error('Valor do ICMS ST (vICMSST) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCPST !== null && (typeof this.vBCFCPST !== 'number' || this.vBCFCPST < 0)) {
      throw new Error('Valor da BC do ICMS FCP (vBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== null && (typeof this.pFCPST !== 'number' || this.pFCPST < 0 || this.pFCPST > 100)) {
      throw new Error('Percentual do ICMS FCP ST (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPST !== null && (typeof this.vFCPST !== 'number' || this.vFCPST < 0)) {
      throw new Error('Valor do ICMS FCP ST (vFCPST) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other) {
    if (!(other instanceof ICMSSN202)) {
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
      this.vFCPST === other.vFCPST
    );
  }

  public toJSON() {
    return {
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
    };
  }
}