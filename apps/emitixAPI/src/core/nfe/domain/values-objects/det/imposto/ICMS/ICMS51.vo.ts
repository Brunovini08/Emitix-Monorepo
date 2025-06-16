const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS51 {
  public readonly orig;
  public readonly CST;
  public readonly modBC;
  public readonly pRedBC;
  public readonly cBenefRBC;
  public readonly vBC;
  public readonly pICMS;
  public readonly vICMSp;
  public readonly pDif;
  public readonly vICMSDif;
  public readonly vICMS;
  public readonly vBCFCP;
  public readonly vFCP;
  public readonly pFCPDif;
  public readonly vFCPDif;
  public readonly vFCPEfet;

  constructor(data) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC ?? null;
    this.pRedBC = data.pRedBC ?? null;
    this.cBenefRBC = data.cBenefRBC ?? null;
    this.vBC = data.vBC ?? null;
    this.pICMS = data.pICMS ?? null;
    this.vICMSp = data.vICMSp ?? null;
    this.pDif = data.pDif ?? null;
    this.vICMSDif = data.vICMSDif ?? null;
    this.vICMS = data.vICMS ?? null;
    this.vBCFCP = data.vBCFCP ?? null;
    this.vFCP = data.vFCP ?? null;
    this.pFCPDif = data.pFCPDif ?? null;
    this.vFCPDif = data.vFCPDif ?? null;
    this.vFCPEfet = data.vFCPEfet ?? null;

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
    if (this.CST !== '51') {
      throw new Error('CST para ICMS51 deve ser obrigatoriamente "51".');
    }

    const allowedModBC = ['0', '1', '2', '3'];
    if (this.modBC !== null && typeof this.modBC !== 'string' && !allowedModBC.includes(this.modBC)) {
        throw new Error(`Modalidade de determinação da BC do ICMS (modBC) deve ser '0', '1', '2' ou '3', se informado.`);
    }

    if (this.pRedBC !== null && (typeof this.pRedBC !== 'number' || this.pRedBC < 0 || this.pRedBC > 100)) {
      throw new Error('Percentual de redução da BC (pRedBC) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.cBenefRBC !== null && (typeof this.cBenefRBC !== 'string' || !(/^[!-ÿ]{8}|[!-ÿ]{10}$/.test(this.cBenefRBC)))) {
      throw new Error('Código de Benefício Fiscal na UF aplicado a BC do ICMS (cBenefRBC) deve ter 8 ou 10 caracteres, se informado.');
    }

    if (this.vBC !== null && (typeof this.vBC !== 'number' || this.vBC < 0)) {
      throw new Error('Valor da BC do ICMS (vBC) deve ser um número não negativo, se informado.');
    }

    if (this.pICMS !== null && (typeof this.pICMS !== 'number' || this.pICMS < 0 || this.pICMS > 100)) {
      throw new Error('Alíquota do ICMS (pICMS) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSp !== null && (typeof this.vICMSp !== 'number' || this.vICMSp < 0)) {
      throw new Error('Valor do ICMS da operação própria (vICMSp) deve ser um número não negativo, se informado.');
    }
    
    if (this.pDif !== null && (typeof this.pDif !== 'number' || this.pDif < 0 || this.pDif > 100)) {
      throw new Error('Percentual do diferimento (pDif) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSDif !== null && (typeof this.vICMSDif !== 'number' || this.vICMSDif < 0)) {
      throw new Error('Valor do ICMS de diferimento (vICMSDif) deve ser um número não negativo, se informado.');
    }

    if (this.vICMS !== null && (typeof this.vICMS !== 'number' || this.vICMS < 0)) {
      throw new Error('Valor do ICMS (vICMS) deve ser um número não negativo, se informado.');
    }

    if (this.vBCFCP !== null && (typeof this.vBCFCP !== 'number' || this.vBCFCP < 0)) {
      throw new Error('Valor da BC do FCP (vBCFCP) deve ser um número não negativo, se informado.');
    }

    if (this.vFCP !== null && (typeof this.vFCP !== 'number' || this.vFCP < 0)) {
      throw new Error('Valor do FCP (vFCP) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPDif !== null && (typeof this.pFCPDif !== 'number' || this.pFCPDif < 0 || this.pFCPDif > 100)) {
      throw new Error('Percentual de diferimento do FCP (pFCPDif) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPDif !== null && (typeof this.vFCPDif !== 'number' || this.vFCPDif < 0)) {
      throw new Error('Valor do FCP diferido (vFCPDif) deve ser um número não negativo, se informado.');
    }

    if (this.vFCPEfet !== null && (typeof this.vFCPEfet !== 'number' || this.vFCPEfet < 0)) {
      throw new Error('Valor efetivo do FCP (vFCPEfet) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other) {
    if (!(other instanceof ICMS51)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.modBC === other.modBC &&
      this.pRedBC === other.pRedBC &&
      this.cBenefRBC === other.cBenefRBC &&
      this.vBC === other.vBC &&
      this.pICMS === other.pICMS &&
      this.vICMSp === other.vICMSp &&
      this.pDif === other.pDif &&
      this.vICMSDif === other.vICMSDif &&
      this.vICMS === other.vICMS &&
      this.vBCFCP === other.vBCFCP &&
      this.vFCP === other.vFCP &&
      this.pFCPDif === other.pFCPDif &&
      this.vFCPDif === other.vFCPDif &&
      this.vFCPEfet === other.vFCPEfet
    );
  }

  public toJSON() {
    return {
      orig: this.orig,
      CST: this.CST,
      modBC: this.modBC,
      pRedBC: this.pRedBC,
      cBenefRBC: this.cBenefRBC,
      vBC: this.vBC,
      pICMS: this.pICMS,
      vICMSp: this.vICMSp,
      pDif: this.pDif,
      vICMSDif: this.vICMSDif,
      vICMS: this.vICMS,
      vBCFCP: this.vBCFCP,
      vFCP: this.vFCP,
      pFCPDif: this.pFCPDif,
      vFCPDif: this.vFCPDif,
      vFCPEfet: this.vFCPEfet,
    };
  }
}