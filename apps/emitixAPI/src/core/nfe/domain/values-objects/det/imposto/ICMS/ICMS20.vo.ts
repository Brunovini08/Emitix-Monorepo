const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS20 {
  public readonly orig;
  public readonly CST;
  public readonly modBC;
  public readonly pRedBC;
  public readonly vBC;
  public readonly pICMS;
  public readonly vICMS;
  public readonly vBCFCP;
  public readonly pFCP;
  public readonly vFCP;
  public readonly vICMSDeson;
  public readonly motDesICMS;
  public readonly indDeduzDeson;

  constructor(data) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC;
    this.pRedBC = data.pRedBC;
    this.vBC = data.vBC;
    this.pICMS = data.pICMS;
    this.vICMS = data.vICMS;
    this.vBCFCP = data.vBCFCP ?? null;
    this.pFCP = data.pFCP ?? null;
    this.vFCP = data.vFCP ?? null;
    this.vICMSDeson = data.vICMSDeson ?? null;
    this.motDesICMS = data.motDesICMS ?? null;
    this.indDeduzDeson = data.indDeduzDeson ?? null;

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

    if (this.vBCFCP !== null && (typeof this.vBCFCP !== 'number' || this.vBCFCP < 0)) {
      throw new Error('Valor da Base de cálculo do FCP (vBCFCP) deve ser um número não negativo, se informado.');
    }

    if (this.pFCP !== null && (typeof this.pFCP !== 'number' || this.pFCP < 0 || this.pFCP > 100)) {
      throw new Error('Percentual de ICMS relativo ao Fundo de Combate à Pobreza (pFCP) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCP !== null && (typeof this.vFCP !== 'number' || this.vFCP < 0)) {
      throw new Error('Valor do ICMS relativo ao Fundo de Combate à Pobreza (vFCP) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSDeson !== null && (typeof this.vICMSDeson !== 'number' || this.vICMSDeson < 0)) {
      throw new Error('Valor do ICMS de desoneração (vICMSDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMS = ['3', '9', '12'];
    if (this.motDesICMS !== null && typeof this.motDesICMS !== 'string' && !allowedMotDesICMS.includes(this.motDesICMS)) {
        throw new Error(`Motivo da desoneração do ICMS (motDesICMS) deve ser '3', '9' ou '12', se informado.`);
    }
    
    const allowedIndDeduzDeson = ['0', '1'];
    if (this.indDeduzDeson !== null && typeof this.indDeduzDeson !== 'string' && !allowedIndDeduzDeson.includes(this.indDeduzDeson)) {
        throw new Error(`Indica se o valor do ICMS desonerado deduz do valor do item (indDeduzDeson) deve ser '0' ou '1', se informado.`);
    }
  }

  public equals(other) {
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
      orig: this.orig,
      CST: this.CST,
      modBC: this.modBC,
      pRedBC: this.pRedBC,
      vBC: this.vBC,
      pICMS: this.pICMS,
      vICMS: this.vICMS,
      vBCFCP: this.vBCFCP,
      pFCP: this.pFCP,
      vFCP: this.vFCP,
      vICMSDeson: this.vICMSDeson,
      motDesICMS: this.motDesICMS,
      indDeduzDeson: this.indDeduzDeson,
    };
  }
}