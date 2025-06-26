const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS70 {
  public readonly orig;
  public readonly CST;
  public readonly modBC;
  public readonly pRedBC;
  public readonly vBC;
  public readonly pICMS;
  public readonly vICMS;
  public readonly vBCFCP?;
  public readonly pFCP?;
  public readonly vFCP?;
  public readonly modBCST;
  public readonly pMVAST?;
  public readonly pRedBCST?;
  public readonly vBCST;
  public readonly pICMSST;
  public readonly vICMSST;
  public readonly vBCFCPST?;
  public readonly pFCPST?;
  public readonly vFCPST?;
  public readonly vICMSDeson?;
  public readonly motDesICMS?;
  public readonly indDeduzDeson?;
  public readonly vICMSSTDeson?;
  public readonly motDesICMSST?;

  constructor(data: { 
    orig: string, 
    CST: string,
    modBC: string,
    pRedBC: string,
    vBC: string,
    vICMS: string,
    pICMS: string,
    vBCFCP?: string | undefined, 
    pFCP?: string | undefined,
    vFCP?: string | undefined,
    modBCST: string,
    pMVAST?: string | undefined,
    pRedBCST?: string | undefined,
    vBCST: string,
    pICMSST?: string | undefined,
    vICMSST?: string | undefined,
    vBCFCPST?: string | undefined,
    pFCPST?: string | undefined,
    vFCPST?: string | undefined,
    vICMSDeson?: string | undefined,
    motDesICMS?: string | undefined,
    indDeduzDeson?: string | undefined,
    vICMSSTDeson?: string | undefined,
    motDesICMSST?: string | undefined
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC;
    this.pRedBC = data.pRedBC;
    this.vBC = data.vBC;
    this.pICMS = data.pICMS;
    this.vICMS = data.vICMS;
    this.vBCFCP = data.vBCFCP
    this.pFCP = data.pFCP	
    this.vFCP = data.vFCP
    this.modBCST = data.modBCST;
    this.pMVAST = data.pMVAST
    this.pRedBCST = data.pRedBCST
    this.vBCST = data.vBCST
    this.pICMSST = data.pICMSST
    this.vICMSST = data.vICMSST
    this.vBCFCPST = data.vBCFCPST
    this.pFCPST = data.pFCPST
    this.vFCPST = data.vFCPST
    this.vICMSDeson = data.vICMSDeson
    this.motDesICMS = data.motDesICMS
    this.indDeduzDeson = data.indDeduzDeson
    this.vICMSSTDeson = data.vICMSSTDeson
    this.motDesICMSST = data.motDesICMSST

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
    if (this.CST !== '70') {
      throw new Error('CST para ICMS70 deve ser obrigatoriamente "70".');
    }

    const allowedModBC = ['0', '1', '2', '3'];
    if (this.modBC === undefined || typeof this.modBC !== 'string' || !allowedModBC.includes(this.modBC)) {
      throw new Error(`
        Modalidade de determinação da BC do ICMS (modBC) é obrigatória e deve ser uma das seguintes:
        0 - Margem Valor Agregado (%); 1 - Pauta (Valor R$); 2 - Preço Tabelado Máximo (Valor R$); 3 - Valor da operação (Valor R$)
      `);
    }

    if (typeof this.pRedBC !== 'string' || this.pRedBC.trim() === '') {
      throw new Error('Percentual de redução da BC (pRedBC) é obrigatório e deve ser um número entre 0 e 100.');
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
      throw new Error('Valor da BC do ICMS FCP (vBCFCP) deve ser um número não negativo, se informado.');
    }

    if (this.vFCP !== undefined && (typeof this.vFCP !== 'string' || this.vFCP.trim() === '')) {
      throw new Error('Valor do ICMS FCP (vFCP) deve ser um número não negativo, se informado.');
    }

    const allowedModBCST = ['0', '1', '2', '3', '4', '5', '6'];
    if (this.modBCST !== undefined && typeof this.modBCST !== 'string' && !allowedModBCST.includes(this.modBCST)) {
      throw new Error(`
        Modalidade de determinação da BC do ICMS ST (modBCST) deve ser uma das seguintes:
        0 - Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor);
        4 - Margem Valor Agregado (%); 5 - Pauta (valor); 6 - Valor da Operação, se informado.
      `);
    }

    if (this.pMVAST !== undefined && (typeof this.pMVAST !== 'string' || this.pMVAST.trim() === '')) {
      throw new Error('Percentual da Margem de Valor Adicionado ICMS ST (pMVAST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pRedBCST !== undefined && (typeof this.pRedBCST !== 'string' || this.pRedBCST.trim() === '')) {
      throw new Error('Percentual de redução da BC ICMS ST (pRedBCST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vBCST !== undefined && (typeof this.vBCST !== 'string' || this.vBCST.trim() === '')) {
      throw new Error('Valor da BC do ICMS ST (vBCST) deve ser um número não negativo, se informado.');
    }

    if (this.pICMSST !== undefined && (typeof this.pICMSST !== 'string' || this.pICMSST.trim() === '')) {
      throw new Error('Alíquota do ICMS ST (pICMSST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSST !== undefined && (typeof this.vICMSST !== 'string' || this.vICMSST.trim() === '')) {
      throw new Error('Valor do ICMS ST (vICMSST) deve ser um número não negativo, se informado.');
    }

    if (this.vBCFCPST !== undefined && (typeof this.vBCFCPST !== 'string' || this.vBCFCPST.trim() === '')) {
      throw new Error('Valor da BC do ICMS FCP ST (vBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== undefined && (typeof this.pFCPST !== 'string' || this.pFCPST.trim() === '')) {
      throw new Error('Percentual do ICMS FCP ST (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPST !== undefined && (typeof this.vFCPST !== 'string' || this.vFCPST.trim() === '')) {
      throw new Error('Valor do ICMS FCP ST (vFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSDeson !== undefined && (typeof this.vICMSDeson !== 'string' || this.vICMSDeson.trim() === '')) {
      throw new Error('Valor do ICMS desonerado (vICMSDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMS = ['3', '9', '12'];
    if (this.motDesICMS !== undefined && typeof this.motDesICMS !== 'string' && !allowedMotDesICMS.includes(this.motDesICMS)) {
      throw new Error(`Motivo da desoneração do ICMS (motDesICMS) deve ser '3', '9' ou '12', se informado.`);
    }

    const allowedIndDeduzDeson = ['0', '1'];
    if (this.indDeduzDeson !== undefined && typeof this.indDeduzDeson !== 'string' && !allowedIndDeduzDeson.includes(this.indDeduzDeson)) {
      throw new Error(`Indica se o valor do ICMS desonerado deduz do valor do item (indDeduzDeson) deve ser '0' ou '1', se informado.`);
    }

    if (this.vICMSSTDeson !== undefined && (typeof this.vICMSSTDeson !== 'string' || this.vICMSSTDeson.trim() === '')) {
      throw new Error('Valor do ICMS ST desonerado (vICMSSTDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMSST = ['0', '3', '12'];
    if (this.motDesICMSST !== undefined && typeof this.motDesICMSST !== 'string' && !allowedMotDesICMSST.includes(this.motDesICMSST)) {
      throw new Error(`Motivo da desoneração do ICMS ST (motDesICMSST) deve ser '0', '3' ou '12', se informado.`);
    }
  }

  public equals(other) {
    if (!(other instanceof ICMS70)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.modBC === other.modBC &&
      this.pRedBC === other.pRedBC &&
      this.vBC === other.vBC &&
      this.pICMS === other.pICMS &&
      this.vICMS === other.vICMS &&
      this.vBCFCP === other.vBCFCP &&
      this.vFCP === other.vFCP &&
      this.modBCST === other.modBCST &&
      this.pMVAST === other.pMVAST &&
      this.pRedBCST === other.pRedBCST &&
      this.vBCST === other.vBCST &&
      this.pICMSST === other.pICMSST &&
      this.vICMSST === other.vICMSST &&
      this.vBCFCPST === other.vBCFCPST &&
      this.pFCPST === other.pFCPST &&
      this.vFCPST === other.vFCPST &&
      this.vICMSDeson === other.vICMSDeson &&
      this.motDesICMS === other.motDesICMS &&
      this.indDeduzDeson === other.indDeduzDeson &&
      this.vICMSSTDeson === other.vICMSSTDeson &&
      this.motDesICMSST === other.motDesICMSST
    );
  }

  public toJSON() {
    return {
      ICMS70: {
        orig: this.orig,
        CST: this.CST,
        modBC: this.modBC,
        pRedBC: this.pRedBC,
        vBC: this.vBC,
        pICMS: this.pICMS,
        vICMS: this.vICMS,
        vBCFCP: this.vBCFCP || undefined,
        pFCP: this.pFCP || undefined,
        vFCP: this.vFCP || undefined,
        modBCST: this.modBCST,
        pMVAST: this.pMVAST || undefined,
        pRedBCST: this.pRedBCST || undefined,
        vBCST: this.vBCST,
        pICMSST: this.pICMSST || undefined,
        vICMSST: this.vICMSST || undefined,
        vBCFCPST: this.vBCFCPST || undefined,
        pFCPST: this.pFCPST || undefined,
        vFCPST: this.vFCPST || undefined,
        vICMSDeson: this.vICMSDeson || undefined,
        motDesICMS: this.motDesICMS || undefined,
        indDeduzDeson: this.indDeduzDeson || undefined,
        vICMSSTDeson: this.vICMSSTDeson || undefined,
        motDesICMSST: this.motDesICMSST || undefined,
      }
    };
  }
}