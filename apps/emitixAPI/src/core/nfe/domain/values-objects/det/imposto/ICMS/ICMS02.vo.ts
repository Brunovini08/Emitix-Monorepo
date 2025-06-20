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
  public readonly vICMSMOno;

  constructor(data) {
    this.orig = data.orig ?? null;
    this.CST = data.CST;
    this.qBCMono = data.qBCMono ?? null;
    this.adRemICMS = data.adRemICMS;
    this.vICMSMOno = data.vICMSMOno;

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

    if (this.qBCMono !== null && (typeof this.qBCMono !== 'number' || this.qBCMono < 0)) {
      throw new Error('Quantidade tributada (qBCMono) deve ser um número não negativo, se informada.');
    }

    if (typeof this.adRemICMS !== 'number' || this.adRemICMS <= 0) { // Assuming adRemICMS should be positive
      throw new Error('Alíquota ad rem do imposto (adRemICMS) é obrigatória e deve ser um número positivo.');
    }

    if (typeof this.vICMSMOno !== 'number' || this.vICMSMOno < 0) {
      throw new Error('Valor do ICMS próprio (vICMSMOno) é obrigatório e deve ser um número não negativo.');
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
      this.vICMSMOno === other.vICMSMOno
    );
  }

  public toJSON() {
    return {
      orig: this.orig,
      CST: this.CST,
      qBCMono: this.qBCMono,
      adRemICMS: this.adRemICMS,
      vICMSMOno: this.vICMSMOno,
    };
  }
}