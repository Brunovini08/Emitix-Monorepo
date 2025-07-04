const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS90 {
  public readonly orig: string;
  public readonly CST: string;
  public readonly modBC?: string;
  public readonly pRedBC?: number;
  public readonly vBC?: number;
  public readonly pICMS?: number;
  public readonly vICMS?: number;
  public readonly vBCFCP?: number;
  public readonly vFCP?: number;
  public readonly pFCP?: number;
  public readonly modBCST?: string;
  public readonly pMVAST?: number;
  public readonly pRedBCST?: number;
  public readonly vBCST?: number;
  public readonly pICMSST?: number;
  public readonly vICMSST?: number;
  public readonly vBCFCPST?: number;
  public readonly pFCPST?: number;
  public readonly vFCPST?: number;
  public readonly vICMSDeson?: number;
  public readonly motDesICMS?: string;
  public readonly indDeduzDeson?: string;
  public readonly vICMSSTDeson?: number;
  public readonly motDesICMSST?: string;
  public readonly vICMSOp?: number;
  public readonly pDif?: number;
  public readonly vICMSDif?: number;

  constructor(data: {
    orig: string,
    CST: string,
    modBC?: string,
    pRedBC?: number,
    vBC?: number,
    pICMS?: number,
    vICMS?: number,
    vBCFCP?: number,
    vFCP?: number,
    modBCST?: string,
    pMVAST?: number,
    pRedBCST?: number,
    vBCST?: number,
    pICMSST?: number,
    vICMSST?: number,
    vBCFCPST?: number,
    pFCPST?: number,
    vFCPST?: number,
    vICMSDeson?: number,
    motDesICMS?: string,
    indDeduzDeson?: string,
    vICMSSTDeson?: number,
    motDesICMSST?: string,
    pFCP?: number,
    vICMSOp?: number,
    pDif?: number,
    vICMSDif?: number
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC;
    this.pRedBC = data.pRedBC;
    this.vBC = data.vBC;
    this.pICMS = data.pICMS;
    this.vICMS = data.vICMS;
    this.vBCFCP = data.vBCFCP;
    this.vFCP = data.vFCP;
    this.pFCP = data.pFCP;
    this.modBCST = data.modBCST;
    this.pMVAST = data.pMVAST;
    this.pRedBCST = data.pRedBCST;
    this.vBCST = data.vBCST;
    this.pICMSST = data.pICMSST;
    this.vICMSST = data.vICMSST;
    this.vBCFCPST = data.vBCFCPST;
    this.pFCPST = data.pFCPST;
    this.vFCPST = data.vFCPST;
    this.vICMSDeson = data.vICMSDeson;
    this.motDesICMS = data.motDesICMS;
    this.indDeduzDeson = data.indDeduzDeson;
    this.vICMSSTDeson = data.vICMSSTDeson;
    this.motDesICMSST = data.motDesICMSST;
    this.vICMSOp = data.vICMSOp;
    this.pDif = data.pDif;
    this.vICMSDif = data.vICMSDif;

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
    if (this.modBC !== undefined && typeof this.modBC !== 'string' && !allowedModBC.includes(this.modBC)) {
      throw new Error(`
        Modalidade de determinação da BC do ICMS (modBC) deve ser uma das seguintes:
        0 - Margem Valor Agregado (%); 1 - Pauta (Valor R$); 2 - Preço Tabelado Máximo (Valor R$); 3 - Valor da operação (Valor R$), se informado.
      `);
    }

    if (this.pRedBC !== undefined && (typeof this.pRedBC !== 'number' || this.pRedBC < 0 || this.pRedBC > 100)) {
      throw new Error('Percentual de redução da BC (pRedBC) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vBC !== undefined && (typeof this.vBC !== 'number' || this.vBC < 0)) {
      throw new Error('Valor da BC do ICMS (vBC) deve ser um número não negativo, se informado.');
    }

    if (this.pICMS !== undefined && (typeof this.pICMS !== 'number' || this.pICMS < 0 || this.pICMS > 100)) {
      throw new Error('Alíquota do ICMS (pICMS) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMS !== undefined && (typeof this.vICMS !== 'number' || this.vICMS < 0)) {
      throw new Error('Valor do ICMS (vICMS) deve ser um número não negativo, se informado.');
    }

    if (this.vBCFCP !== undefined && (typeof this.vBCFCP !== 'number' || this.vBCFCP < 0)) {
      throw new Error('Valor da BC do ICMS FCP (vBCFCP) deve ser um número não negativo, se informado.');
    }

    if (this.vFCP !== undefined && (typeof this.vFCP !== 'number' || this.vFCP < 0)) {
      throw new Error('Valor do ICMS FCP (vFCP) deve ser um número não negativo, se informado.');
    }

    if (this.pFCP !== undefined && (typeof this.pFCP !== 'number' || this.pFCP < 0 || this.pFCP > 100)) {
      throw new Error('Alíquota do FCP (pFCP) deve ser um número entre 0 e 100, se informado.');
    }

    const allowedModBCST = ['0', '1', '2', '3', '4', '5', '6'];
    if (this.modBCST !== undefined && typeof this.modBCST !== 'string' && !allowedModBCST.includes(this.modBCST)) {
      throw new Error(`
        Modalidade de determinação da BC do ICMS ST (modBCST) deve ser uma das seguintes:
        0 - Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor);
        4 - Margem Valor Agregado (%); 5 - Pauta (valor); 6 - Valor da Operação, se informado.
      `);
    }

    if (this.pMVAST !== undefined && (typeof this.pMVAST !== 'number' || this.pMVAST < 0 || this.pMVAST > 100)) {
      throw new Error('Percentual da Margem de Valor Adicionado ICMS ST (pMVAST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pRedBCST !== undefined && (typeof this.pRedBCST !== 'number' || this.pRedBCST < 0 || this.pRedBCST > 100)) {
      throw new Error('Percentual de redução da BC ICMS ST (pRedBCST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vBCST !== undefined && (typeof this.vBCST !== 'number' || this.vBCST < 0)) {
      throw new Error('Valor da BC do ICMS ST (vBCST) deve ser um número não negativo, se informado.');
    }

    if (this.pICMSST !== undefined && (typeof this.pICMSST !== 'number' || this.pICMSST < 0 || this.pICMSST > 100)) {
      throw new Error('Alíquota do ICMS ST (pICMSST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSST !== undefined && (typeof this.vICMSST !== 'number' || this.vICMSST < 0)) {
      throw new Error('Valor do ICMS ST (vICMSST) deve ser um número não negativo, se informado.');
    }

    if (this.vBCFCPST !== undefined && (typeof this.vBCFCPST !== 'number' || this.vBCFCPST < 0)) {
      throw new Error('Valor da BC do ICMS FCP ST (vBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== undefined && (typeof this.pFCPST !== 'number' || this.pFCPST < 0 || this.pFCPST > 100)) {
      throw new Error('Percentual do ICMS FCP ST (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPST !== undefined && (typeof this.vFCPST !== 'number' || this.vFCPST < 0)) {
      throw new Error('Valor do ICMS FCP ST (vFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSDeson !== undefined && (typeof this.vICMSDeson !== 'number' || this.vICMSDeson < 0)) {
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

    if (this.vICMSSTDeson !== undefined && (typeof this.vICMSSTDeson !== 'number' || this.vICMSSTDeson < 0)) {
      throw new Error('Valor do ICMS ST desonerado (vICMSSTDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMSST = ['3', '9', '12'];
    if (this.motDesICMSST !== undefined && typeof this.motDesICMSST !== 'string' && !allowedMotDesICMSST.includes(this.motDesICMSST)) {
      throw new Error(`Motivo da desoneração do ICMS ST (motDesICMSST) deve ser '3', '9' ou '12', se informado.`);
    }

    if (this.vICMSOp !== undefined && (typeof this.vICMSOp !== 'number' || this.vICMSOp < 0)) {
      throw new Error('Valor do ICMS Op (vICMSOp) deve ser um número não negativo, se informado.');
    }

    if (this.pDif !== undefined && (typeof this.pDif !== 'number' || this.pDif < 0 || this.pDif > 100)) {
      throw new Error('Percentual de diferença de alíquota (pDif) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSDif !== undefined && (typeof this.vICMSDif !== 'number' || this.vICMSDif < 0)) {
      throw new Error('Valor do ICMS Dif (vICMSDif) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other: ICMS90): boolean {
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
      this.pFCP === other.pFCP &&
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
      this.motDesICMSST === other.motDesICMSST &&
      this.vICMSOp === other.vICMSOp &&
      this.pDif === other.pDif &&
      this.vICMSDif === other.vICMSDif
    );
  }

  public toJSON() {
    return {
      ICMS90: {
        orig: this.orig,
        CST: this.CST,
        modBC: this.modBC || undefined,
        pRedBC: this.pRedBC?.toFixed(2) || undefined,
        vBC: this.vBC?.toFixed(2) || undefined,
        pICMS: this.pICMS?.toFixed(2) || undefined,
        vICMS: this.vICMS?.toFixed(2) || undefined,
        vBCFCP: this.vBCFCP?.toFixed(2) || undefined,
        vFCP: this.vFCP?.toFixed(2) || undefined,
        pFCP: this.pFCP?.toFixed(2) || undefined,
        modBCST: this.modBCST || undefined,
        pMVAST: this.pMVAST?.toFixed(2) || undefined,
        pRedBCST: this.pRedBCST?.toFixed(2) || undefined,
        vBCST: this.vBCST?.toFixed(2) || undefined,
        pICMSST: this.pICMSST?.toFixed(2) || undefined,
        vICMSST: this.vICMSST?.toFixed(2) || undefined,
        vBCFCPST: this.vBCFCPST?.toFixed(2) || undefined,
        pFCPST: this.pFCPST?.toFixed(2) || undefined,
        vFCPST: this.vFCPST?.toFixed(2) || undefined,
        vICMSDeson: this.vICMSDeson?.toFixed(2) || undefined,
        motDesICMS: this.motDesICMS || undefined,
        indDeduzDeson: this.indDeduzDeson || undefined,
        vICMSSTDeson: this.vICMSSTDeson?.toFixed(2) || undefined,
        motDesICMSST: this.motDesICMSST || undefined,
        vICMSOp: this.vICMSOp?.toFixed(2) || undefined,
        pDif: this.pDif?.toFixed(2) || undefined,
        vICMSDif: this.vICMSDif?.toFixed(2) || undefined,
      }
    };
  }
}