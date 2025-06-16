const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMSSN900 {
  public readonly orig;
  public readonly CSOSN;
  public readonly modBC;
  public readonly vBC;
  public readonly pRedBC;
  public readonly pICMS;
  public readonly vICMS;
  public readonly modBCST;
  public readonly pMVAST;
  public readonly pRedBCST;
  public readonly vBCST;
  public readonly pICMSST;
  public readonly vICMSST;
  public readonly VBCFCPST;
  public readonly pFCPST;
  public readonly pCredSN;
  public readonly vCredICMSSN;

  constructor(data) {
    this.orig = data.orig;
    this.CSOSN = data.CSOSN;
    this.modBC = data.modBC ?? null;
    this.vBC = data.vBC ?? null;
    this.pRedBC = data.pRedBC ?? null;
    this.pICMS = data.pICMS ?? null;
    this.vICMS = data.vICMS ?? null;
    this.modBCST = data.modBCST ?? null;
    this.pMVAST = data.pMVAST ?? null;
    this.pRedBCST = data.pRedBCST ?? null;
    this.vBCST = data.vBCST ?? null;
    this.pICMSST = data.pICMSST ?? null;
    this.vICMSST = data.vICMSST ?? null;
    this.VBCFCPST = data.VBCFCPST ?? null;
    this.pFCPST = data.pFCPST ?? null;
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

    const allowedCSOSN = ['202', '203'];
    if (this.CSOSN === undefined || typeof this.CSOSN !== 'string' || !allowedCSOSN.includes(this.CSOSN)) {
      throw new Error(`
        CSOSN (Código de Situação da Operação – Simples Nacional) é obrigatório e deve ser '202' ou '203'.
        Este campo se refere ao CST (Código de Situação Tributária) do ICMS e espera os valores 202 ou 203.
      `);
    }

    const allowedModBC = ['0', '1', '2', '3'];
    if (this.modBC !== null && typeof this.modBC !== 'string' && !allowedModBC.includes(this.modBC)) {
        throw new Error(`
        Modalidade de determinação da BC do ICMS (modBC) deve ser uma das seguintes:
        0 - Margem Valor Agregado (%); 1 - Pauta (valor); 2 - Preço Tabelado Máximo (valor); 3 - Valor da Operação, se informado.
      `);
    }

    if (this.vBC !== null && (typeof this.vBC !== 'number' || this.vBC < 0)) {
      throw new Error('Valor da BC do ICMS (vBC) deve ser um número não negativo, se informado.');
    }

    if (this.pRedBC !== null && (typeof this.pRedBC !== 'number' || this.pRedBC < 0 || this.pRedBC > 100)) {
      throw new Error('Percentual de redução da BC (pRedBC) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pICMS !== null && (typeof this.pICMS !== 'number' || this.pICMS < 0 || this.pICMS > 100)) {
      throw new Error('Alíquota do ICMS (pICMS) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMS !== null && (typeof this.vICMS !== 'number' || this.vICMS < 0)) {
      throw new Error('Valor do ICMS (vICMS) deve ser um número não negativo, se informado.');
    }

    const allowedModBCST = ['0', '1', '2', '3', '4', '5', '6'];
    if (this.modBCST !== null && typeof this.modBCST !== 'string' && !allowedModBCST.includes(this.modBCST)) {
        throw new Error(`
        Modalidade de determinação da BC do ICMS ST (modBCST) deve ser uma das seguintes:
        0 - Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor);
        4 - Margem Valor Agregado (%); 5 - Pauta (valor); 6 - Valor da Operação, se informado.
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

    if (this.pICMSST !== null && (typeof this.pICMSST !== 'number' || this.pICMSST < 0 || this.pICMSST > 100)) {
      throw new Error('Alíquota do ICMS ST (pICMSST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSST !== null && (typeof this.vICMSST !== 'number' || this.vICMSST < 0)) {
      throw new Error('Valor do ICMS ST (vICMSST) deve ser um número não negativo, se informado.');
    }

    if (this.VBCFCPST !== null && (typeof this.VBCFCPST !== 'number' || this.VBCFCPST < 0)) {
      throw new Error('Valor da BC do ICMS FCP ST (VBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== null && (typeof this.pFCPST !== 'number' || this.pFCPST < 0 || this.pFCPST > 100)) {
      throw new Error('Alíquota do ICMS FCP ST (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pCredSN !== null && (typeof this.pCredSN !== 'number' || this.pCredSN < 0 || this.pCredSN > 100)) {
      throw new Error('Percentual do crédito de ICMS (pCredSN) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vCredICMSSN !== null && (typeof this.vCredICMSSN !== 'number' || this.vCredICMSSN < 0)) {
      throw new Error('Valor do crédito de ICMS (vCredICMSSN) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other) {
    if (!(other instanceof ICMSSN900)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CSOSN === other.CSOSN &&
      this.modBC === other.modBC &&
      this.vBC === other.vBC &&
      this.pRedBC === other.pRedBC &&
      this.pICMS === other.pICMS &&
      this.vICMS === other.vICMS &&
      this.modBCST === other.modBCST &&
      this.pMVAST === other.pMVAST &&
      this.pRedBCST === other.pRedBCST &&
      this.vBCST === other.vBCST &&
      this.pICMSST === other.pICMSST &&
      this.vICMSST === other.vICMSST &&
      this.VBCFCPST === other.VBCFCPST &&
      this.pFCPST === other.pFCPST &&
      this.pCredSN === other.pCredSN &&
      this.vCredICMSSN === other.vCredICMSSN
    );
  }

  public toJSON() {
    return {
      orig: this.orig,
      CSOSN: this.CSOSN,
      modBC: this.modBC,
      vBC: this.vBC,
      pRedBC: this.pRedBC,
      pICMS: this.pICMS,
      vICMS: this.vICMS,
      modBCST: this.modBCST,
      pMVAST: this.pMVAST,
      pRedBCST: this.pRedBCST,
      vBCST: this.vBCST,
      pICMSST: this.pICMSST,
      vICMSST: this.vICMSST,
      VBCFCPST: this.VBCFCPST,
      pFCPST: this.pFCPST,
      pCredSN: this.pCredSN,
      vCredICMSSN: this.vCredICMSSN,
    };
  }
}