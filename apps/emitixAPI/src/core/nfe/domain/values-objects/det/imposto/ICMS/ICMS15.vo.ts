const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS15 {
  public readonly orig;
  public readonly CST;
  public readonly qBCMono;
  public readonly adRemICMS;
  public readonly vICMSMono;
  public readonly qBCMonoReten;
  public readonly adRemICMSReten;
  public readonly vICMSMonoReten;
  public readonly pRedAdRem;
  public readonly motRedAdRem;

  constructor(data) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.qBCMono = data.qBCMono ?? null;
    this.adRemICMS = data.adRemICMS;
    this.vICMSMono = data.vICMSMono;
    this.qBCMonoReten = data.qBCMonoReten ?? null;
    this.adRemICMSReten = data.adRemICMSReten ?? null;
    this.vICMSMonoReten = data.vICMSMonoReten ?? null;
    this.pRedAdRem = data.pRedAdRem ?? null;
    this.motRedAdRem = data.motRedAdRem ?? null;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (this.orig === undefined || !(Object.values(TorigEnum).includes(this.orig))) {
      throw new Error(`Origem da mercadoria (orig) é obrigatória e deve ser um dos valores válidos: 0, 1, 2.`);
    }

    if (this.CST === undefined || typeof this.CST !== 'string' || this.CST.trim() === '') {
      throw new Error('Código de Situação Tributária (CST) do ICMS é obrigatório.');
    }
    if (this.CST !== '15') {
      throw new Error('CST para ICMS15 deve ser obrigatoriamente "15".');
    }

    if (this.qBCMono !== null && (typeof this.qBCMono !== 'number' || this.qBCMono < 0)) {
      throw new Error('Quantidade tributada (qBCMono) deve ser um número não negativo, se informada.');
    }

    if (typeof this.adRemICMS !== 'number' || this.adRemICMS <= 0) {
      throw new Error('Alíquota ad rem do imposto (adRemICMS) é obrigatória e deve ser um número positivo.');
    }

    if (typeof this.vICMSMono !== 'number' || this.vICMSMono < 0) {
      throw new Error('Valor do ICMS próprio (vICMSMono) é obrigatório e deve ser um número não negativo.');
    }

    if (this.qBCMonoReten !== null && (typeof this.qBCMonoReten !== 'number' || this.qBCMonoReten < 0)) {
      throw new Error('Quantidade tributada sujeita a retenção (qBCMonoReten) deve ser um número não negativo, se informada.');
    }

    if (this.adRemICMSReten !== null && (typeof this.adRemICMSReten !== 'number' || this.adRemICMSReten <= 0)) {
      throw new Error('Alíquota ad rem do imposto com retenção (adRemICMSReten) deve ser um número positivo, se informada.');
    }

    if (this.vICMSMonoReten !== null && (typeof this.vICMSMonoReten !== 'number' || this.vICMSMonoReten < 0)) {
      throw new Error('Valor do ICMS com retenção (vICMSMonoReten) deve ser um número não negativo, se informado.');
    }

    if (this.pRedAdRem !== null && (typeof this.pRedAdRem !== 'number' || this.pRedAdRem < 0 || this.pRedAdRem > 100)) {
      throw new Error('Percentual de redução do valor da alíquota ad rem do ICMS (pRedAdRem) deve ser um número entre 0 e 100, se informado.');
    }

    const allowedMotRedAdRem = ['1', '9'];
    if (this.motRedAdRem !== null && typeof this.motRedAdRem !== 'string' && !allowedMotRedAdRem.includes(this.motRedAdRem)) {
        throw new Error(`Motivo da redução do adrem (motRedAdRem) deve ser '1' ou '9', se informado.`);
    }
  }

  public equals(other) {
    if (!(other instanceof ICMS15)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.qBCMono === other.qBCMono &&
      this.adRemICMS === other.adRemICMS &&
      this.vICMSMono === other.vICMSMono &&
      this.qBCMonoReten === other.qBCMonoReten &&
      this.adRemICMSReten === other.adRemICMSReten &&
      this.vICMSMonoReten === other.vICMSMonoReten &&
      this.pRedAdRem === other.pRedAdRem &&
      this.motRedAdRem === other.motRedAdRem
    );
  }

  public toJSON() {
    return {
      orig: this.orig,
      CST: this.CST,
      qBCMono: this.qBCMono,
      adRemICMS: this.adRemICMS,
      vICMSMono: this.vICMSMono,
      qBCMonoReten: this.qBCMonoReten,
      adRemICMSReten: this.adRemICMSReten,
      vICMSMonoReten: this.vICMSMonoReten,
      pRedAdRem: this.pRedAdRem,
      motRedAdRem: this.motRedAdRem,
    };
  }
}