const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS15 {
  public readonly orig;
  public readonly CST;
  public readonly qBCMono?: string | undefined;
  public readonly adRemICMS;
  public readonly vICMSMono;
  public readonly qBCMonoReten;
  public readonly adRemICMSReten;
  public readonly vICMSMonoReten;
  public readonly pRedAdRem?: string | undefined;
  public readonly motRedAdRem?: string | undefined;

  constructor(data: { orig: string,
    CST: string,
    qBCMono?: string | undefined,
    adRemICMS: string,
    vICMSMono: string,
    qBCMonoReten?: string | undefined,
    adRemICMSReten?: string | undefined,
    vICMSMonoReten?: string | undefined,
    pRedAdRem?: string | undefined,
    motRedAdRem?: string | undefined
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.qBCMono = data.qBCMono;
    this.adRemICMS = data.adRemICMS;
    this.vICMSMono = data.vICMSMono;
    this.qBCMonoReten = data.qBCMonoReten;
    this.adRemICMSReten = data.adRemICMSReten;
    this.vICMSMonoReten = data.vICMSMonoReten
    this.pRedAdRem = data.pRedAdRem;
    this.motRedAdRem = data.motRedAdRem;

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

    if (this.qBCMono !== undefined && (typeof this.qBCMono !== 'string' || this.qBCMono.trim() === '')) {
      throw new Error('Quantidade tributada (qBCMono) deve ser um número não negativo, se informada.');
    }

    if (typeof this.adRemICMS !== 'string' || this.adRemICMS.trim() === '') {
      throw new Error('Alíquota ad rem do imposto (adRemICMS) é obrigatória e deve ser um número positivo.');
    }

    if (typeof this.vICMSMono !== 'string' || this.vICMSMono.trim() === '') {
      throw new Error('Valor do ICMS próprio (vICMSMono) é obrigatório e deve ser um número não negativo.');
    }

    if (this.qBCMonoReten !== undefined && (typeof this.qBCMonoReten !== 'string' || this.qBCMonoReten.trim() === '')) {
      throw new Error('Quantidade tributada sujeita a retenção (qBCMonoReten) deve ser um número não negativo, se informada.');
    }

    if (this.adRemICMSReten !== undefined && (typeof this.adRemICMSReten !== 'string' || this.adRemICMSReten.trim() === '')) {
      throw new Error('Alíquota ad rem do imposto com retenção (adRemICMSReten) deve ser um número positivo, se informada.');
    }

    if (this.vICMSMonoReten !== undefined && (typeof this.vICMSMonoReten !== 'string' || this.vICMSMonoReten.trim() === '')) {
      throw new Error('Valor do ICMS com retenção (vICMSMonoReten) deve ser um número não negativo, se informado.');
    }

    if (this.pRedAdRem !== undefined && (typeof this.pRedAdRem !== 'string' || this.pRedAdRem.trim() === '')) { 
      throw new Error('Percentual de redução do valor da alíquota ad rem do ICMS (pRedAdRem) deve ser um número entre 0 e 100, se informado.');
    }

    const allowedMotRedAdRem = ['1', '9'];
    if (this.motRedAdRem !== undefined && typeof this.motRedAdRem !== 'string' && !allowedMotRedAdRem.includes(this.motRedAdRem)) {
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
      ICMS15: {
        orig: this.orig,
        CST: this.CST,
        qBCMono: this.qBCMono || undefined,
        adRemICMS: this.adRemICMS,
        vICMSMono: this.vICMSMono,
        qBCMonoReten: this.qBCMonoReten,
        adRemICMSReten: this.adRemICMSReten,
        vICMSMonoReten: this.vICMSMonoReten,
        pRedAdRem: this.pRedAdRem || undefined,
        motRedAdRem: this.motRedAdRem || undefined,
      }
    };
  }
}