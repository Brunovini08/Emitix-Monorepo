const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS90 {
  public readonly orig;
  public readonly CST;
  public readonly modBC;
  public readonly pRedBC;
  public readonly vBC;
  public readonly pICMS;
  public readonly vICMS;
  public readonly vBCFCP;
  public readonly vFCP;
  public readonly modBCST;
  public readonly pMVAST;
  public readonly pRedBCST;
  public readonly vBCST;
  public readonly pICMSST;
  public readonly vICMSST;
  public readonly vBCFCPST;
  public readonly pFCPST;
  public readonly vFCPST;
  public readonly vICMSDeson;
  public readonly motDesICMS;
  public readonly indDeduzDeson;
  public readonly vICMSSTDeson;
  public readonly motDesICMSST;

  constructor(data: { orig: string, CST: string, modBC: string, pRedBC: string, vBC: string, pICMS: string, vICMS: string, vBCFCP: string | null, vFCP: string | null, modBCST: string | null, pMVAST: string | null, pRedBCST: string | null, vBCST: string | null, pICMSST: string | null, vICMSST: string | null, vBCFCPST: string | null, pFCPST: string | null, vFCPST: string | null, vICMSDeson: string | null, motDesICMS: string | null, indDeduzDeson: string | null, vICMSSTDeson: string | null, motDesICMSST: string | null }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC;
    this.pRedBC = data.pRedBC;
    this.vBC = data.vBC;
    this.pICMS = data.pICMS;
    this.vICMS = data.vICMS;
    this.vBCFCP = data.vBCFCP ?? null;
    this.vFCP = data.vFCP ?? null;
    this.modBCST = data.modBCST ?? null;
    this.pMVAST = data.pMVAST ?? null;
    this.pRedBCST = data.pRedBCST ?? null;
    this.vBCST = data.vBCST ?? null;
    this.pICMSST = data.pICMSST ?? null;
    this.vICMSST = data.vICMSST ?? null;
    this.vBCFCPST = data.vBCFCPST ?? null;
    this.pFCPST = data.pFCPST ?? null;
    this.vFCPST = data.vFCPST ?? null;
    this.vICMSDeson = data.vICMSDeson ?? null;
    this.motDesICMS = data.motDesICMS ?? null;
    this.indDeduzDeson = data.indDeduzDeson ?? null;
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
    if (this.CST !== '90') {
      throw new Error('CST para ICMS90 deve ser obrigatoriamente "90".');
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

    if (this.vBCFCP !== null && (typeof this.vBCFCP !== 'string' || this.vBCFCP.trim() === '')) {
      throw new Error('Valor da BC do ICMS FCP (vBCFCP) deve ser um número não negativo, se informado.');
    }

    if (this.vFCP !== null && (typeof this.vFCP !== 'string' || this.vFCP.trim() === '')) {
      throw new Error('Valor do ICMS FCP (vFCP) deve ser um número não negativo, se informado.');
    }

    const allowedModBCST = ['0', '1', '2', '3', '4', '5', '6'];
    if (this.modBCST !== null && typeof this.modBCST !== 'string' && !allowedModBCST.includes(this.modBCST)) {
      throw new Error(`
        Modalidade de determinação da BC do ICMS ST (modBCST) deve ser uma das seguintes:
        0 - Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor);
        4 - Margem Valor Agregado (%); 5 - Pauta (valor); 6 - Valor da Operação, se informado.
      `);
    }

    if (this.pMVAST !== null && (typeof this.pMVAST !== 'string' || this.pMVAST.trim() === '')) {
      throw new Error('Percentual da Margem de Valor Adicionado ICMS ST (pMVAST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pRedBCST !== null && (typeof this.pRedBCST !== 'string' || this.pRedBCST.trim() === '')) {
      throw new Error('Percentual de redução da BC ICMS ST (pRedBCST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vBCST !== null && (typeof this.vBCST !== 'string' || this.vBCST.trim() === '')) {
      throw new Error('Valor da BC do ICMS ST (vBCST) deve ser um número não negativo, se informado.');
    }

    if (this.pICMSST !== null && (typeof this.pICMSST !== 'string' || this.pICMSST.trim() === '')) {
      throw new Error('Alíquota do ICMS ST (pICMSST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSST !== null && (typeof this.vICMSST !== 'string' || this.vICMSST.trim() === '')) {
      throw new Error('Valor do ICMS ST (vICMSST) deve ser um número não negativo, se informado.');
    }

    if (this.vBCFCPST !== null && (typeof this.vBCFCPST !== 'string' || this.vBCFCPST.trim() === '')) {
      throw new Error('Valor da BC do ICMS FCP ST (vBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== null && (typeof this.pFCPST !== 'string' || this.pFCPST.trim() === '')) {
      throw new Error('Percentual do ICMS FCP ST (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPST !== null && (typeof this.vFCPST !== 'string' || this.vFCPST.trim() === '')) {
      throw new Error('Valor do ICMS FCP ST (vFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSDeson !== null && (typeof this.vICMSDeson !== 'string' || this.vICMSDeson.trim() === '')) {
      throw new Error('Valor do ICMS desonerado (vICMSDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMS = ['3', '9', '12'];
    if (this.motDesICMS !== null && typeof this.motDesICMS !== 'string' && !allowedMotDesICMS.includes(this.motDesICMS)) {
        throw new Error(`Motivo da desoneração do ICMS (motDesICMS) deve ser '3', '9' ou '12', se informado.`);
    }
    
    const allowedIndDeduzDeson = ['0', '1'];
    if (this.indDeduzDeson !== null && typeof this.indDeduzDeson !== 'string' && !allowedIndDeduzDeson.includes(this.indDeduzDeson)) {
        throw new Error(`Indica se o valor do ICMS desonerado deduz do valor do item (indDeduzDeson) deve ser '0' ou '1', se informado.`);
    }

    if (this.vICMSSTDeson !== null && (typeof this.vICMSSTDeson !== 'string' || this.vICMSSTDeson.trim() === '')) {
      throw new Error('Valor do ICMS ST desonerado (vICMSSTDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMSST = ['0', '3', '12'];
    if (this.motDesICMSST !== null && typeof this.motDesICMSST !== 'string' && !allowedMotDesICMSST.includes(this.motDesICMSST)) {
        throw new Error(`Motivo da desoneração do ICMS ST (motDesICMSST) deve ser '0', '3' ou '12', se informado.`);
    }
  }

  public equals(other) {
    if (!(other instanceof ICMS90)) {
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
      ICMS90: {
        orig: this.orig,
        CST: this.CST,
        modBC: this.modBC,
        pRedBC: this.pRedBC,
        vBC: this.vBC,
        pICMS: this.pICMS,
        vICMS: this.vICMS,
        vBCFCP: this.vBCFCP,
        vFCP: this.vFCP,
        modBCST: this.modBCST,
        pMVAST: this.pMVAST,
        pRedBCST: this.pRedBCST,
        vBCST: this.vBCST,
        pICMSST: this.pICMSST,
        vICMSST: this.vICMSST,
        vBCFCPST: this.vBCFCPST,
        pFCPST: this.pFCPST,
        vFCPST: this.vFCPST,
        vICMSDeson: this.vICMSDeson,
        motDesICMS: this.motDesICMS,
        indDeduzDeson: this.indDeduzDeson,
        vICMSSTDeson: this.vICMSSTDeson,
        motDesICMSST: this.motDesICMSST,
      }
    };
  }
}