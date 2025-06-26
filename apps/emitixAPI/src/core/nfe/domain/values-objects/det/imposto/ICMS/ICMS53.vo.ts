const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS53 {
  public readonly orig;
  public readonly CST;
  public readonly qBCMono?;
  public readonly adRemICMS?;
  public readonly vICMSMonoOp?;
  public readonly pDif?;
  public readonly vICMSMonoDif?;
  public readonly vICMSMono?;
  public readonly qBCMonoDif?;
  public readonly adRemICMSDif?;

  constructor(data: {
    orig: string,
    CST: string,
    qBCMono?: string | undefined,
    adRemICMS?: string | undefined,
    vICMSMonoOp?: string | undefined,
    pDif?: string | undefined,
    vICMSMonoDif?: string | undefined,
    vICMSMono?: string | undefined,
    qBCMonoDif?: string | undefined,
    adRemICMSDif?: string | undefined
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.qBCMono = data.qBCMono ?? undefined;
    this.adRemICMS = data.adRemICMS ?? undefined;
    this.vICMSMonoOp = data.vICMSMonoOp ?? undefined;
    this.pDif = data.pDif ?? undefined;
    this.vICMSMonoDif = data.vICMSMonoDif ?? undefined;
    this.vICMSMono = data.vICMSMono ?? undefined;
    this.qBCMonoDif = data.qBCMonoDif ?? undefined;
    this.adRemICMSDif = data.adRemICMSDif ?? undefined;

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

    if (this.qBCMono !== undefined && (typeof this.qBCMono !== 'string' || this.qBCMono.trim() === '')) {
      throw new Error('Quantidade tributada (qBCMono) deve ser um número não negativo, se informada.');
    }

    if (this.adRemICMS !== undefined && (typeof this.adRemICMS !== 'string' || this.adRemICMS.trim() === '')) {
      throw new Error('Alíquota ad rem do imposto (adRemICMS) deve ser um número não negativo, se informada.');
    }

    if (this.vICMSMonoOp !== undefined && (typeof this.vICMSMonoOp !== 'string' || this.vICMSMonoOp.trim() === '')) {
      throw new Error('Valor do ICMS da operação (vICMSMonoOp) deve ser um número não negativo, se informado.');
    }

    if (this.pDif !== undefined && (typeof this.pDif !== 'string' || this.pDif.trim() === '')) {
      throw new Error('Percentual do diferimento (pDif) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSMonoDif !== undefined && (typeof this.vICMSMonoDif !== 'string' || this.vICMSMonoDif.trim() === '')) {
      throw new Error('Valor do ICMS diferido (vICMSMonoDif) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSMono !== undefined && (typeof this.vICMSMono !== 'string' || this.vICMSMono.trim() === '')) {
      throw new Error('Valor do ICMS próprio devido (vICMSMono) deve ser um número não negativo, se informado.');
    }

    if (this.qBCMonoDif !== undefined && (typeof this.qBCMonoDif !== 'string' || this.qBCMonoDif.trim() === '')) {
      throw new Error('Quantidade tributada diferida (qBCMonoDif) deve ser um número não negativo, se informada.');
    }

    if (this.adRemICMSDif !== undefined && (typeof this.adRemICMSDif !== 'string' || this.adRemICMSDif.trim() === '')) {
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
      this.pDif === other.pDif &&
      this.vICMSMonoDif === other.vICMSMonoDif &&
      this.vICMSMono === other.vICMSMono &&
      this.qBCMonoDif === other.qBCMonoDif &&
      this.adRemICMSDif === other.adRemICMSDif
    );
  }

  public toJSON() {
    return {
      ICMS53: {
        orig: this.orig,
        CST: this.CST,
        qBCMono: this.qBCMono,
        adRemICMS: this.adRemICMS,
        vICMSMonoOp: this.vICMSMonoOp,
        pDif: this.pDif,
        vICMSMonoDif: this.vICMSMonoDif,
        vICMSMono: this.vICMSMono,
        qBCMonoDif: this.qBCMonoDif,
        adRemICMSDif: this.adRemICMSDif,
      }
    };
  }
}