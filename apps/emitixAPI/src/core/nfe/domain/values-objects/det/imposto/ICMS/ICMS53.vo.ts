const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS53 {
  public readonly orig: string;
  public readonly CST: string;
  public readonly adRemICMS: number;
  public readonly vICMSMonoOp: number;
  public readonly pDif: number;
  public readonly vICMSMonoDif: number;
  public readonly vICMSMono: number;
  public readonly qBCMonoDif: number;
  public readonly adRemICMSDif: number;
  public readonly qBCMono: number;

  constructor(data: {
    orig: string,
    CST: string,
    adRemICMS: number,
    vICMSMonoOp: number,
    pDif: number,
    vICMSMonoDif: number,
    vICMSMono: number,
    qBCMonoDif: number,
    adRemICMSDif: number,
    qBCMono: number,
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.adRemICMS = data.adRemICMS;
    this.vICMSMonoOp = data.vICMSMonoOp;
    this.pDif = data.pDif;
    this.vICMSMonoDif = data.vICMSMonoDif;
    this.vICMSMono = data.vICMSMono;
    this.qBCMonoDif = data.qBCMonoDif;
    this.adRemICMSDif = data.adRemICMSDif;
    this.qBCMono = data.qBCMono;

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

    if (typeof this.adRemICMS !== 'number' || this.adRemICMS < 0) {
      throw new Error('Alíquota ad valorem do ICMS (adRemICMS) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.vICMSMonoOp !== 'number' || this.vICMSMonoOp < 0) {
      throw new Error('Valor do ICMS da operação (vICMSMonoOp) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pDif !== 'number' || this.pDif < 0 || this.pDif > 100) {
      throw new Error('Percentual do diferimento (pDif) é obrigatório e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vICMSMonoDif !== 'number' || this.vICMSMonoDif < 0) {
      throw new Error('Valor do ICMS diferido (vICMSMonoDif) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.vICMSMono !== 'number' || this.vICMSMono < 0) {
      throw new Error('Valor do ICMS monofásico (vICMSMono) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.qBCMonoDif !== 'number' || this.qBCMonoDif < 0) {
      throw new Error('Quantidade tributada diferida (qBCMonoDif) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.adRemICMSDif !== 'number' || this.adRemICMSDif < 0) {
      throw new Error('Alíquota ad valorem do ICMS diferido (adRemICMSDif) é obrigatória e deve ser um número não negativo.');
    }

    if (typeof this.qBCMono !== 'number' || this.qBCMono < 0) {
      throw new Error('Quantidade tributada (qBCMono) é obrigatória e deve ser um número não negativo.');
    }
  }

  public equals(other: ICMS53): boolean {
    if (!(other instanceof ICMS53)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.adRemICMS === other.adRemICMS &&
      this.vICMSMonoOp === other.vICMSMonoOp &&
      this.pDif === other.pDif &&
      this.vICMSMonoDif === other.vICMSMonoDif &&
      this.vICMSMono === other.vICMSMono &&
      this.qBCMonoDif === other.qBCMonoDif &&
      this.adRemICMSDif === other.adRemICMSDif &&
      this.qBCMono === other.qBCMono
    );
  }

  public toJSON() {
    return {
      ICMS53: {
        orig: this.orig,
        CST: this.CST,
        adRemICMS: this.adRemICMS.toFixed(2),
        vICMSMonoOp: this.vICMSMonoOp.toFixed(2),
        pDif: this.pDif.toFixed(2),
        vICMSMonoDif: this.vICMSMonoDif.toFixed(2),
        vICMSMono: this.vICMSMono.toFixed(2),
        qBCMonoDif: this.qBCMonoDif.toFixed(4),
        adRemICMSDif: this.adRemICMSDif.toFixed(2),
        qBCMono: this.qBCMono.toFixed(4),
      }
    };
  }
}