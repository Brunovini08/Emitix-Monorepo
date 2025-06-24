const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS02 {
  public readonly orig;
  public readonly CST;
  public readonly qBCMono;
  public readonly adRemICMS;
  public readonly vICMSMono;

  constructor(data: { orig: string, CST: string, qBCMono: string, adRemICMS: string, vICMSMono: string }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.qBCMono = data.qBCMono;
    this.adRemICMS = data.adRemICMS;
    this.vICMSMono = data.vICMSMono;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (this.orig !== null && !(Object.values(TorigEnum).includes(this.orig))) {
      throw new Error(`
        Origem da mercadoria (orig) deve ser um dos seguintes valores:
        ${Object.values(TorigEnum).join(', ')} (0 - Nacional, 1 - Estrangeira - Importação direta, 2 - Estrangeira - Adquirida no mercado interno), se informado.
      `);
    }

    if (this.CST === undefined || typeof this.CST !== 'string' || this.CST.trim() === '') {
      throw new Error('Código de Situação Tributária (CST) do ICMS é obrigatório.');
    }
    if (this.CST !== '02') {
      throw new Error('CST para ICMS02 deve ser obrigatoriamente "02".');
    }

    if (this.qBCMono !== null && (typeof this.qBCMono !== 'string' || this.qBCMono.trim() === '')) {
      throw new Error('Quantidade tributada (qBCMono) deve ser um número não negativo, se informada.');
    }

    if (typeof this.adRemICMS !== 'string' || this.adRemICMS.trim() === '') { // Assuming adRemICMS should be positive
      throw new Error('Alíquota ad rem do imposto (adRemICMS) é obrigatória e deve ser um número positivo.');
    }

    if (typeof this.vICMSMono !== 'string' || this.vICMSMono.trim() === '') {
      throw new Error('Valor do ICMS próprio (vICMSMono) é obrigatório e deve ser um número não negativo.');
    }
  }

  public equals(other) {
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
        qBCMono: this.qBCMono,
        adRemICMS: this.adRemICMS,
        vICMSMono: this.vICMSMono,
      }
    };
  }
}