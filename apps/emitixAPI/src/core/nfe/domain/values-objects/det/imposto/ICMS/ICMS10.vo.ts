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
  public readonly vBCFCP?: string | undefined;
  public readonly pFCP?: string | undefined;
  public readonly vFCP?: string | undefined;
  public readonly modBCST;
  public readonly pMVAST: string;
  public readonly pRedBCST: string;
  public readonly vBCST;
  public readonly pICMSST;
  public readonly VICMSST;
  public readonly vBCFCPST?: string | undefined;
  public readonly pFCPST?: string | undefined;
  public readonly vFCPPST?: string | undefined;
  public readonly vICMSSTDeson?: string | undefined;
  public readonly motDesICMSST?: string | undefined;

  constructor(data: {
    orig: string,
    CST: string,
    modBC: string,
    vBC: string,
    pICMS: string,
    vICMS: string,
    vBCFCP?: string | undefined,
    pFCP?: string | undefined, 
    vFCP?: string | undefined, 
    modBCST: string,
    pMVAST: string,
    pRedBCST: string,
    vBCST: string,
    pICMSST: string,
    VICMSST: string,
    vBCFCPST?: string | undefined, 
    pFCPST?: string | undefined,
    vFCPPST?: string | undefined, 
    vICMSSTDeson?: string | undefined, 
    motDesICMSST?: string | undefined
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC;
    this.vBC = data.vBC;
    this.pICMS = data.pICMS;
    this.vICMS = data.vICMS;
    this.vBCFCP = data.vBCFCP;
    this.pFCP = data.pFCP;
    this.vFCP = data.vFCP;
    this.modBCST = data.modBCST;
    this.pMVAST = data.pMVAST
    this.pRedBCST = data.pRedBCST
    this.vBCST = data.vBCST;
    this.pICMSST = data.pICMSST;
    this.VICMSST = data.VICMSST;
    this.vBCFCPST = data.vBCFCPST;
    this.pFCPST = data.pFCPST;
    this.vFCPPST = data.vFCPPST;
    this.vICMSSTDeson = data.vICMSSTDeson;
    this.motDesICMSST = data.motDesICMSST;

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

    if (typeof this.vBC !== 'string' || this.vBC.trim() === '') {
      throw new Error('Valor da BC do ICMS (vBC) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pICMS !== 'string' || this.pICMS.trim() === '') {
      throw new Error('Alíquota do ICMS (pICMS) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vICMS !== 'string' || this.vICMS.trim() === '') {
      throw new Error('Valor do ICMS (vICMS) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCP !== undefined && (typeof this.vBCFCP !== 'string' || this.vBCFCP.trim() === '')) {
      throw new Error('Valor da BC do FCP (vBCFCP) deve ser um número não negativo, se informado.');
    }

    if (this.pFCP !== undefined && (typeof this.pFCP !== 'string' || this.pFCP.trim() === '')) {
      throw new Error('Alíquota do FCP (pFCP) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCP !== undefined && (typeof this.vFCP !== 'string' || this.vFCP.trim() === '')) {
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

    if (this.pMVAST !== undefined && (typeof this.pMVAST !== 'string' || this.pMVAST.trim() === '')) {
      throw new Error('Percentual da Margem de Valor Adicionado ICMS ST (pMVAST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pRedBCST !== undefined && (typeof this.pRedBCST !== 'string' || this.pRedBCST.trim() === '')) {
      throw new Error('Percentual de redução da BC ICMS ST (pRedBCST) deve ser um número entre 0 e 100, se informado.');
    }

    if (typeof this.vBCST !== 'string' || this.vBCST.trim() === '') {
      throw new Error('Valor da BC do ICMS ST (vBCST) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pICMSST !== 'string' || this.pICMSST.trim() === '') {
      throw new Error('Alíquota do ICMS ST (pICMSST) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.VICMSST !== 'string' || this.VICMSST.trim() === '') {
      throw new Error('Valor do ICMS ST (VICMSST) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCPST !== undefined && (typeof this.vBCFCPST !== 'string' || this.vBCFCPST.trim() === '')) {
      throw new Error('Valor da BC do FCP ST (vBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== undefined && (typeof this.pFCPST !== 'string' || this.pFCPST.trim() === '')) {
      throw new Error('Alíquota do FCP ST (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPPST !== undefined && (typeof this.vFCPPST !== 'string' || this.vFCPPST.trim() === '')) {
      throw new Error('Valor do FCP ST (vFCPPST) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSSTDeson !== undefined && (typeof this.vICMSSTDeson !== 'string' || this.vICMSSTDeson.trim() === '')) {
      throw new Error('Valor do ICMS ST desonerado (vICMSSTDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMSST = ['3', '9', '12'];
    if (this.motDesICMSST !== undefined && typeof this.motDesICMSST !== 'string' && !allowedMotDesICMSST.includes(this.motDesICMSST)) {
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
      ICMS10: {
        orig: this.orig,
        CST: this.CST,
        modBC: this.modBC,
        vBC: this.vBC,
        pICMS: this.pICMS,
        vICMS: this.vICMS,
        vBCFCP: this.vBCFCP || undefined,
        pFCP: this.pFCP || undefined,
        vFCP: this.vFCP || undefined,
        modBCST: this.modBCST,
        pMVAST: this.pMVAST,
        pRedBCST: this.pRedBCST,
        vBCST: this.vBCST,
        pICMSST: this.pICMSST,
        VICMSST: this.VICMSST,
        vBCFCPST: this.vBCFCPST || undefined,
        pFCPST: this.pFCPST || undefined,
        vFCPPST: this.vFCPPST || undefined,
        vICMSSTDeson: this.vICMSSTDeson || undefined,
        motDesICMSST: this.motDesICMSST || undefined,
      }
    };
  }
}