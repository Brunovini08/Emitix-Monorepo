const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS61 {
  public readonly orig;
  public readonly CST;
  public readonly qBCMonoRet;
  public readonly adRemICMSRet;
  public readonly vICMSMonoRet;

  constructor(data) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.qBCMonoRet = data.qBCMonoRet ?? null;
    this.adRemICMSRet = data.adRemICMSRet ?? null;
    this.vICMSMonoRet = data.vICMSMonoRet ?? null;

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
    if (this.CST !== '61') {
      throw new Error('CST para ICMS61 deve ser obrigatoriamente "61".');
    }

    if (this.qBCMonoRet !== null && (typeof this.qBCMonoRet !== 'number' || this.qBCMonoRet < 0)) {
      throw new Error('Quantidade tributada retida anteriormente (qBCMonoRet) deve ser um número não negativo, se informada.');
    }

    if (this.adRemICMSRet !== null && (typeof this.adRemICMSRet !== 'number' || this.adRemICMSRet < 0)) {
      throw new Error('Alíquota ad rem do imposto retido anteriormente (adRemICMSRet) deve ser um número não negativo, se informada.');
    }

    if (this.vICMSMonoRet !== null && (typeof this.vICMSMonoRet !== 'number' || this.vICMSMonoRet < 0)) {
      throw new Error('Valor do ICMS da operação retido anteriormente (vICMSMonoRet) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other) {
    if (!(other instanceof ICMS61)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.qBCMonoRet === other.qBCMonoRet &&
      this.adRemICMSRet === other.adRemICMSRet &&
      this.vICMSMonoRet === other.vICMSMonoRet
    );
  }

  public toJSON() {
    return {
      orig: this.orig,
      CST: this.CST,
      qBCMonoRet: this.qBCMonoRet,
      adRemICMSRet: this.adRemICMSRet,
      vICMSMonoRet: this.vICMSMonoRet,
    };
  }
}