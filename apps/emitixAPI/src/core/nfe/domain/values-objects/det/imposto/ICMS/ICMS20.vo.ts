const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS20 {
  public readonly orig: string;
  public readonly CST: string;
  public readonly modBC: string;
  public readonly pRedBC: number;
  public readonly vBC: number;
  public readonly pICMS: number;
  public readonly vICMS: number;
  public readonly vBCFCP?: number;
  public readonly pFCP?: number;
  public readonly vFCP?: number;
  public readonly vICMSDeson?: number;
  public readonly motDesICMS?: string;
  public readonly indDeduzDeson?: string;

  constructor(data: {
    orig: string,
    CST: string,
    modBC: string,
    pRedBC: number,
    vBC: number,
    pICMS: number,
    vICMS: number,
    vBCFCP?: number,
    pFCP?: number,
    vFCP?: number,
    vICMSDeson?: number,
    motDesICMS?: string,
    indDeduzDeson?: string,
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC;
    this.pRedBC = data.pRedBC;
    this.vBC = data.vBC;
    this.pICMS = data.pICMS;
    this.vICMS = data.vICMS;
    this.vBCFCP = data.vBCFCP;
    this.pFCP = data.pFCP;
    this.vFCP = data.vFCP;
    this.vICMSDeson = data.vICMSDeson;
    this.motDesICMS = data.motDesICMS;
    this.indDeduzDeson = data.indDeduzDeson;

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
    if (this.CST !== '20') {
      throw new Error('CST para ICMS20 deve ser obrigatoriamente "20".');
    }

    const allowedModBC = ['0', '1', '2', '3'];
    if (this.modBC === undefined || typeof this.modBC !== 'string' || !allowedModBC.includes(this.modBC)) {
      throw new Error(`
        Modalidade de determinação da BC do ICMS (modBC) é obrigatória e deve ser uma das seguintes:
        0 - Margem Valor Agregado (%); 1 - Pauta (valor); 2 - Preço Tabelado Máximo (valor); 3 - Valor da Operação.
      `);
    }

    if (typeof this.pRedBC !== 'number' || this.pRedBC < 0 || this.pRedBC > 100) {
      throw new Error('Percentual de redução da BC (pRedBC) é obrigatório e deve ser um número entre 0 e 100.');
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

    if (this.vBCFCP !== undefined && (typeof this.vBCFCP !== 'number' || this.vBCFCP < 0)) {
      throw new Error('Valor da BC do FCP (vBCFCP) deve ser um número não negativo, se informado.');
    }

    if (this.pFCP !== undefined && (typeof this.pFCP !== 'number' || this.pFCP < 0 || this.pFCP > 100)) {
      throw new Error('Alíquota do FCP (pFCP) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCP !== undefined && (typeof this.vFCP !== 'number' || this.vFCP < 0)) {
      throw new Error('Valor do FCP (vFCP) deve ser um número não negativo, se informado.');
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
  }

  public equals(other: ICMS20): boolean {
    if (!(other instanceof ICMS20)) {
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
      this.pFCP === other.pFCP &&
      this.vFCP === other.vFCP &&
      this.vICMSDeson === other.vICMSDeson &&
      this.motDesICMS === other.motDesICMS &&
      this.indDeduzDeson === other.indDeduzDeson
    );
  }

  public toJSON() {
    return {
      ICMS20: {
        orig: this.orig,
        CST: this.CST,
        modBC: this.modBC,
        pRedBC: this.pRedBC.toFixed(2),
        vBC: this.vBC.toFixed(2),
        pICMS: this.pICMS.toFixed(2),
        vICMS: this.vICMS.toFixed(2),
        vBCFCP: this.vBCFCP?.toFixed(2),
        pFCP: this.pFCP?.toFixed(2),
        vFCP: this.vFCP?.toFixed(2),
        vICMSDeson: this.vICMSDeson?.toFixed(2),
        motDesICMS: this.motDesICMS,
        indDeduzDeson: this.indDeduzDeson,
      }
    };
  }
}