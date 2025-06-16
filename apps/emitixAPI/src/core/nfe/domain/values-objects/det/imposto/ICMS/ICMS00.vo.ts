const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS00 {
  public readonly orig;
  public readonly CST;
  public readonly modBC;
  public readonly vBC;
  public readonly pICMS;
  public readonly vICMS;
  public readonly pFCP;
  public readonly vFCP;

  constructor(data) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC;
    this.vBC = data.vBC;
    this.pICMS = data.pICMS;
    this.vICMS = data.vICMS;
    this.pFCP = data.pFCP ?? null;
    this.vFCP = data.vFCP ?? null;

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
    if (this.CST !== '00') {
      throw new Error('CST para ICMS00 deve ser obrigatoriamente "00".');
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

    if (this.pFCP !== null && (typeof this.pFCP !== 'number' || this.pFCP < 0 || this.pFCP > 100)) {
      throw new Error('Alíquota do FCP (pFCP) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCP !== null && (typeof this.vFCP !== 'number' || this.vFCP < 0)) {
      throw new Error('Valor do FCP (vFCP) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other) {
    if (!(other instanceof ICMS00)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.modBC === other.modBC &&
      this.vBC === other.vBC &&
      this.pICMS === other.pICMS &&
      this.vICMS === other.vICMS &&
      this.pFCP === other.pFCP &&
      this.vFCP === other.vFCP
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
      pFCP: this.pFCP,
      vFCP: this.vFCP,
    };
  }
}