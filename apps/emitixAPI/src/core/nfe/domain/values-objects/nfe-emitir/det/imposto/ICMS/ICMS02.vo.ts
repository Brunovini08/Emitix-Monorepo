const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS02 {
  public readonly orig: string;
  public readonly CST: string;
  public readonly qBCMono: number;
  public readonly adRemICMS: number;
  public readonly vICMSMono: number;

  constructor(data: {
    orig: string,
    CST: string,
    qBCMono: number,
    adRemICMS: number,
    vICMSMono: number,
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.qBCMono = data.qBCMono;
    this.adRemICMS = data.adRemICMS;
    this.vICMSMono = data.vICMSMono;

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
    if (this.CST !== '02') {
      throw new Error('CST para ICMS02 deve ser obrigatoriamente "02".');
    }

    if (typeof this.qBCMono !== 'number' || this.qBCMono < 0) {
      throw new Error('Quantidade tributada (qBCMono) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.adRemICMS !== 'number' || this.adRemICMS < 0) {
      throw new Error('Alíquota ad valorem do ICMS (adRemICMS) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.vICMSMono !== 'number' || this.vICMSMono < 0) {
      throw new Error('Valor do ICMS monofásico (vICMSMono) é obrigatório e deve ser um número não negativo.');
    }
  }

  public equals(other: ICMS02): boolean {
    if (!(other instanceof ICMS02)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.qBCMono === other.qBCMono &&
      this.adRemICMS === other.adRemICMS &&
      this.vICMSMono === other.vICMSMono
    );
  }

  public toJSON() {
    return {
      ICMS02: {
        orig: this.orig,
        CST: this.CST,
        qBCMono: this.qBCMono.toFixed(4),
        adRemICMS: this.adRemICMS.toFixed(2),
        vICMSMono: this.vICMSMono.toFixed(2),
      }
    };
  }
}