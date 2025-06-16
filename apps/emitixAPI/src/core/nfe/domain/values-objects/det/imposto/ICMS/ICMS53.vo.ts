const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS53 {
  public readonly orig;
  public readonly CST;
  public readonly qBCMono;
  public readonly adRemICMS;
  public readonly vICMSMonoOp;
  public readonly pDof;
  public readonly vICMSMonoDif;
  public readonly vICMSMono;
  public readonly qBCMonoDif;
  public readonly adRemICMSDif;

  constructor(data) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.qBCMono = data.qBCMono ?? null;
    this.adRemICMS = data.adRemICMS ?? null;
    this.vICMSMonoOp = data.vICMSMonoOp ?? null;
    this.pDof = data.pDof ?? null;
    this.vICMSMonoDif = data.vICMSMonoDif ?? null;
    this.vICMSMono = data.vICMSMono ?? null;
    this.qBCMonoDif = data.qBCMonoDif ?? null;
    this.adRemICMSDif = data.adRemICMSDif ?? null;

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
    if (this.CST !== '53') {
      throw new Error('CST para ICMS53 deve ser obrigatoriamente "53".');
    }

    if (this.qBCMono !== null && (typeof this.qBCMono !== 'number' || this.qBCMono < 0)) {
      throw new Error('Quantidade tributada (qBCMono) deve ser um número não negativo, se informada.');
    }

    if (this.adRemICMS !== null && (typeof this.adRemICMS !== 'number' || this.adRemICMS < 0)) {
      throw new Error('Alíquota ad rem do imposto (adRemICMS) deve ser um número não negativo, se informada.');
    }

    if (this.vICMSMonoOp !== null && (typeof this.vICMSMonoOp !== 'number' || this.vICMSMonoOp < 0)) {
      throw new Error('Valor do ICMS da operação (vICMSMonoOp) deve ser um número não negativo, se informado.');
    }

    if (this.pDof !== null && (typeof this.pDof !== 'number' || this.pDof < 0 || this.pDof > 100)) {
      throw new Error('Percentual do diferimento (pDof) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSMonoDif !== null && (typeof this.vICMSMonoDif !== 'number' || this.vICMSMonoDif < 0)) {
      throw new Error('Valor do ICMS diferido (vICMSMonoDif) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSMono !== null && (typeof this.vICMSMono !== 'number' || this.vICMSMono < 0)) {
      throw new Error('Valor do ICMS próprio devido (vICMSMono) deve ser um número não negativo, se informado.');
    }

    if (this.qBCMonoDif !== null && (typeof this.qBCMonoDif !== 'number' || this.qBCMonoDif < 0)) {
      throw new Error('Quantidade tributada diferida (qBCMonoDif) deve ser um número não negativo, se informada.');
    }

    if (this.adRemICMSDif !== null && (typeof this.adRemICMSDif !== 'number' || this.adRemICMSDif < 0)) {
      throw new Error('Alíquota ad rem do imposto diferido (adRemICMSDif) deve ser um número não negativo, se informada.');
    }
  }

  public equals(other) {
    if (!(other instanceof ICMS53)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.qBCMono === other.qBCMono &&
      this.adRemICMS === other.adRemICMS &&
      this.vICMSMonoOp === other.vICMSMonoOp &&
      this.pDof === other.pDof &&
      this.vICMSMonoDif === other.vICMSMonoDif &&
      this.vICMSMono === other.vICMSMono &&
      this.qBCMonoDif === other.qBCMonoDif &&
      this.adRemICMSDif === other.adRemICMSDif
    );
  }

  public toJSON() {
    return {
      orig: this.orig,
      CST: this.CST,
      qBCMono: this.qBCMono,
      adRemICMS: this.adRemICMS,
      vICMSMonoOp: this.vICMSMonoOp,
      pDof: this.pDof,
      vICMSMonoDif: this.vICMSMonoDif,
      vICMSMono: this.vICMSMono,
      qBCMonoDif: this.qBCMonoDif,
      adRemICMSDif: this.adRemICMSDif,
    };
  }
}