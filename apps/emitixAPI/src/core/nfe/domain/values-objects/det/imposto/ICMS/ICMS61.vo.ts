const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS61 {
  public readonly orig: string;
  public readonly CST: string;
  public readonly qBCMonoRet: number;
  public readonly adRemICMSRet: number;
  public readonly vICMSMonoRet: number;

  constructor(data: {
    orig: string,
    CST: string,
    qBCMonoRet: number,
    adRemICMSRet: number,
    vICMSMonoRet: number,
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.qBCMonoRet = data.qBCMonoRet;
    this.adRemICMSRet = data.adRemICMSRet;
    this.vICMSMonoRet = data.vICMSMonoRet;

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

    if (typeof this.qBCMonoRet !== 'number' || this.qBCMonoRet < 0) {
      throw new Error('Quantidade tributada retida (qBCMonoRet) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.adRemICMSRet !== 'number' || this.adRemICMSRet < 0) {
      throw new Error('Alíquota ad valorem do ICMS retido (adRemICMSRet) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.vICMSMonoRet !== 'number' || this.vICMSMonoRet < 0) {
      throw new Error('Valor do ICMS monofásico retido (vICMSMonoRet) é obrigatório e deve ser um número não negativo.');
    }
  }

  public equals(other: ICMS61): boolean {
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
      ICMS61: {
        orig: this.orig,
        CST: this.CST,
        qBCMonoRet: this.qBCMonoRet.toFixed(4),
        adRemICMSRet: this.adRemICMSRet.toFixed(2),
        vICMSMonoRet: this.vICMSMonoRet.toFixed(2),
      }
    };
  }
}