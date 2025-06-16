const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS10 {
  public readonly orig;
  public readonly CST;
  public readonly modBC;
  public readonly vBC;
  public readonly pICMS;
  public readonly vICMS;
  public readonly vBCFCP;
  public readonly pFCP;
  public readonly vFCP;
  public readonly modBCST;
  public readonly pMVAST;
  public readonly pRedBCST;
  public readonly vBCST;
  public readonly pICMSST;
  public readonly VICMSST;
  public readonly vBCFCPST;
  public readonly pFCPST;
  public readonly vFCPPST;
  public readonly vICMSSTDeson;
  public readonly motDesICMSST;

  constructor(data) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC;
    this.vBC = data.vBC;
    this.pICMS = data.pICMS;
    this.vICMS = data.vICMS;
    this.vBCFCP = data.vBCFCP ?? null;
    this.pFCP = data.pFCP ?? null;
    this.vFCP = data.vFCP ?? null;
    this.modBCST = data.modBCST;
    this.pMVAST = data.pMVAST ?? null;
    this.pRedBCST = data.pRedBCST ?? null;
    this.vBCST = data.vBCST;
    this.pICMSST = data.pICMSST;
    this.VICMSST = data.VICMSST;
    this.vBCFCPST = data.vBCFCPST ?? null;
    this.pFCPST = data.pFCPST ?? null;
    this.vFCPPST = data.vFCPPST ?? null;
    this.vICMSSTDeson = data.vICMSSTDeson ?? null;
    this.motDesICMSST = data.motDesICMSST ?? null;

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
    if (this.CST !== '10') {
      throw new Error('CST para ICMS10 deve ser obrigatoriamente "10".');
    }

    const allowedModBC = ['0', '1', '2', '3'];
    if (this.modBC === undefined || typeof this.modBC !== 'string' || !allowedModBC.includes(this.modBC)) {
      throw new Error(`
        Modalidade de determinação da BC do ICMS (modBC) é obrigatória e deve ser uma das seguintes:
        0 - Margem Valor Agregado (%), 1 - Pauta (valor), 2 - Preço Tabelado Máximo (valor), 3 - Valor da Operação
      `);
    }

    if (typeof this.vBC !== 'number' || this.vBC < 0) {
      throw new Error('Valor da BC do ICMS (vBC) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pICMS !== 'number' || this.pICMS < 0 || this.pICMS > 100) {
      throw new Error('Alíquota do ICMS (pICMS) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vICMS !== 'number' || this.vICMS < 0) {
      throw new Error('Valor do ICMS (vICMS) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCP !== null && (typeof this.vBCFCP !== 'number' || this.vBCFCP < 0)) {
      throw new Error('Valor da BC do FCP (vBCFCP) deve ser um número não negativo, se informado.');
    }

    if (this.pFCP !== null && (typeof this.pFCP !== 'number' || this.pFCP < 0 || this.pFCP > 100)) {
      throw new Error('Alíquota do FCP (pFCP) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCP !== null && (typeof this.vFCP !== 'number' || this.vFCP < 0)) {
      throw new Error('Valor do FCP (vFCP) deve ser um número não negativo, se informado.');
    }

    const allowedModBCST = ['0', '1', '2', '3', '4', '5', '6'];
    if (this.modBCST === undefined || typeof this.modBCST !== 'string' || !allowedModBCST.includes(this.modBCST)) {
      throw new Error(`
        Modalidade de determinação da BC do ICMS ST (modBCST) é obrigatória e deve ser uma das seguintes:
        0 - Preço tabelado ou máximo sugerido; 1 - Lista Negativa; 2 - Lista Positiva; 3 - Lista Neutra;
        4 - Margem Valor Agregado (%); 5 - Pauta; 6 - Valor da Operação;
      `);
    }

    if (this.pMVAST !== null && (typeof this.pMVAST !== 'number' || this.pMVAST < 0 || this.pMVAST > 100)) {
      throw new Error('Percentual da Margem de Valor Adicionado ICMS ST (pMVAST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pRedBCST !== null && (typeof this.pRedBCST !== 'number' || this.pRedBCST < 0 || this.pRedBCST > 100)) {
      throw new Error('Percentual de redução da BC ICMS ST (pRedBCST) deve ser um número entre 0 e 100, se informado.');
    }

    if (typeof this.vBCST !== 'number' || this.vBCST < 0) {
      throw new Error('Valor da BC do ICMS ST (vBCST) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pICMSST !== 'number' || this.pICMSST < 0 || this.pICMSST > 100) {
      throw new Error('Alíquota do ICMS ST (pICMSST) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.VICMSST !== 'number' || this.VICMSST < 0) {
      throw new Error('Valor do ICMS ST (VICMSST) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCPST !== null && (typeof this.vBCFCPST !== 'number' || this.vBCFCPST < 0)) {
      throw new Error('Valor da BC do FCP ST (vBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== null && (typeof this.pFCPST !== 'number' || this.pFCPST < 0 || this.pFCPST > 100)) {
      throw new Error('Alíquota do FCP ST (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPPST !== null && (typeof this.vFCPPST !== 'number' || this.vFCPPST < 0)) {
      throw new Error('Valor do FCP ST (vFCPPST) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSSTDeson !== null && (typeof this.vICMSSTDeson !== 'number' || this.vICMSSTDeson < 0)) {
      throw new Error('Valor do ICMS ST desonerado (vICMSSTDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMSST = ['3', '9', '12'];
    if (this.motDesICMSST !== null && typeof this.motDesICMSST !== 'string' && !allowedMotDesICMSST.includes(this.motDesICMSST)) {
        throw new Error(`Motivo da desoneração do ICMS ST (motDesICMSST) deve ser um dos seguintes: '3', '9', '12', se informado.`);
    }
  }

  public equals(other) {
    if (!(other instanceof ICMS10)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.modBC === other.modBC &&
      this.vBC === other.vBC &&
      this.pICMS === other.pICMS &&
      this.vICMS === other.vICMS &&
      this.vBCFCP === other.vBCFCP &&
      this.pFCP === other.pFCP &&
      this.vFCP === other.vFCP &&
      this.modBCST === other.modBCST &&
      this.pMVAST === other.pMVAST &&
      this.pRedBCST === other.pRedBCST &&
      this.vBCST === other.vBCST &&
      this.pICMSST === other.pICMSST &&
      this.VICMSST === other.VICMSST &&
      this.vBCFCPST === other.vBCFCPST &&
      this.pFCPST === other.pFCPST &&
      this.vFCPPST === other.vFCPPST &&
      this.vICMSSTDeson === other.vICMSSTDeson &&
      this.motDesICMSST === other.motDesICMSST
    );
  }

  public toJSON() {
    return {
      orig: this.orig,
      CST: this.CST,
      modBC: this.modBC,
      vBC: this.vBC,
      pICMS: this.pICMS,
      vICMS: this.vICMS,
      vBCFCP: this.vBCFCP,
      pFCP: this.pFCP,
      vFCP: this.vFCP,
      modBCST: this.modBCST,
      pMVAST: this.pMVAST,
      pRedBCST: this.pRedBCST,
      vBCST: this.vBCST,
      pICMSST: this.pICMSST,
      VICMSST: this.VICMSST,
      vBCFCPST: this.vBCFCPST,
      pFCPST: this.pFCPST,
      vFCPPST: this.vFCPPST,
      vICMSSTDeson: this.vICMSSTDeson,
      motDesICMSST: this.motDesICMSST,
    };
  }
}