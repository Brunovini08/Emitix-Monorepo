const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS51 {
  public readonly orig;
  public readonly CST;
  public readonly modBC?: string | undefined;
  public readonly pRedBC?: string | undefined ;
  public readonly cBenefRBC?: string | undefined;
  public readonly vBC?: string | undefined;
  public readonly pICMS?: string | undefined;
  public readonly vICMSOp?: string | undefined;
  public readonly pDif?: string | undefined;
  public readonly vICMSDif?: string | undefined;
  public readonly vICMS?: string | undefined;
  public readonly vBCFCP?: string | undefined;
  public readonly pFCP?: string | undefined;
  public readonly vFCP?: string | undefined;
  public readonly pFCPDif?: string | undefined;
  public readonly vFCPDif?: string | undefined;
  public readonly vFCPEfet?: string | undefined;

  constructor(data: { 
    orig: string,
    CST: string,
    pFCP?: string | undefined,
    modBC?: string | undefined,
    pRedBC?: string | undefined,
    cBenefRBC?: string | undefined,
    vBC?: string | undefined, 
    pICMS?: string | undefined,
    vICMSOp?: string | undefined,
    pDif?: string | undefined,
    vICMSDif?: string | undefined,
    vICMS?: string | undefined,
    vBCFCP?: string | undefined,
    vFCP?: string | undefined,
    pFCPDif?: string | undefined,
    vFCPDif?: string | undefined,
    vFCPEfet?: string | undefined
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC ?? undefined;
    this.pRedBC = data.pRedBC ?? undefined;
    this.cBenefRBC = data.cBenefRBC ?? undefined;
    this.vBC = data.vBC ?? undefined;
    this.pICMS = data.pICMS ?? undefined;
    this.vICMSOp = data.vICMSOp ?? undefined;
    this.pDif = data.pDif ?? undefined;
    this.vICMSDif = data.vICMSDif ?? undefined;
    this.vICMS = data.vICMS ?? undefined;
    this.vBCFCP = data.vBCFCP ?? undefined;
    this.pFCP = data.pFCP ?? undefined;
    this.vFCP = data.vFCP ?? undefined;
    this.pFCPDif = data.pFCPDif ?? undefined;
    this.vFCPDif = data.vFCPDif ?? undefined;
    this.vFCPEfet = data.vFCPEfet ?? undefined;

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
    if (this.modBC !== undefined && typeof this.modBC !== 'string' && !allowedModBC.includes(this.modBC)) {
      throw new Error(`Modalidade de determinação da BC do ICMS (modBC) deve ser '0', '1', '2' ou '3', se informado.`);
    }


    if (this.cBenefRBC !== undefined && (typeof this.cBenefRBC !== 'string' || !(/^[!-ÿ]{8}|[!-ÿ]{10}$/.test(this.cBenefRBC)))) {
      throw new Error('Código de Benefício Fiscal na UF aplicado a BC do ICMS (cBenefRBC) deve ter 8 ou 10 caracteres, se informado.');
    }

    if (this.vBC !== undefined && (typeof this.vBC !== 'string' || this.vBC.trim() === '')) {
      throw new Error('Valor da BC do ICMS (vBC) deve ser um número não negativo, se informado.');
    }

    if (this.pICMS !== undefined && (typeof this.pICMS !== 'string' || this.pICMS.trim() === '')) {
      throw new Error('Alíquota do ICMS (pICMS) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSOp !== undefined && (typeof this.vICMSOp !== 'string' || this.vICMSOp.trim() === '')) {
      throw new Error('Valor do ICMS da operação própria (vICMSOp) deve ser um número não negativo, se informado.');
    }

    if (this.pDif !== undefined && (typeof this.pDif !== 'string' || this.pDif.trim() === '')) {
      throw new Error('Percentual do diferimento (pDif) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSDif !== undefined && (typeof this.vICMSDif !== 'string' || this.vICMSDif.trim() === '')) {
      throw new Error('Valor do ICMS de diferimento (vICMSDif) deve ser um número não negativo, se informado.');
    }

    if (this.vICMS !== undefined && (typeof this.vICMS !== 'string' || this.vICMS.trim() === '')) {
      throw new Error('Valor do ICMS (vICMS) deve ser um número não negativo, se informado.');
    }

    if (this.vBCFCP !== undefined && (typeof this.vBCFCP !== 'string' || this.vBCFCP.trim() === '')) {
      throw new Error('Valor da BC do FCP (vBCFCP) deve ser um número não negativo, se informado.');
    }

    if (this.vFCP !== undefined && (typeof this.vFCP !== 'string' || this.vFCP.trim() === '')) {
      throw new Error('Valor do FCP (vFCP) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPDif !== undefined && (typeof this.pFCPDif !== 'string' || this.pFCPDif.trim() === '')) {
      throw new Error('Percentual de diferimento do FCP (pFCPDif) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPDif !== undefined && (typeof this.vFCPDif !== 'string' || this.vFCPDif.trim() === '')) {
      throw new Error('Valor do FCP diferido (vFCPDif) deve ser um número não negativo, se informado.');
    }

    if (this.vFCPEfet !== undefined && (typeof this.vFCPEfet !== 'string' || this.vFCPEfet.trim() === '')) {
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
      this.vICMSOp === other.vICMSOp &&
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
      ICMS51: {
        orig: this.orig,
        CST: this.CST,
        modBC: this.modBC,
        pRedBC: this.pRedBC,
        cBenefRBC: this.cBenefRBC,
        vBC: this.vBC,
        pICMS: this.pICMS,
        vICMSOp: this.vICMSOp,
        pDif: this.pDif,
        vICMSDif: this.vICMSDif,
        vICMS: this.vICMS,
        vBCFCP: this.vBCFCP,
        pFCP: this.pFCP,
        vFCP: this.vFCP,
        pFCPDif: this.pFCPDif,
        vFCPDif: this.vFCPDif,
        vFCPEfet: this.vFCPEfet,
      }
    };
  }
}