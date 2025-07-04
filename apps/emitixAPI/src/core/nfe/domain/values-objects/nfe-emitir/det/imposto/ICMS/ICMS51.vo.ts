const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS51 {
  public readonly orig: string;
  public readonly CST: string;
  public readonly modBC?: string;
  public readonly pRedBC?: number;
  public readonly cBenefRBC?: string;
  public readonly vBC?: number;
  public readonly pICMS?: number;
  public readonly vICMSOp?: number;
  public readonly pDif?: number;
  public readonly vICMSDif?: number;
  public readonly vICMS?: number;
  public readonly vBCFCP?: number;
  public readonly vFCP?: number;
  public readonly pFCPDif?: number;
  public readonly vFCPDif?: number;
  public readonly vFCPEfet?: number;

  constructor(data: {
    orig: string,
    CST: string,
    modBC?: string,
    pRedBC?: number,
    cBenefRBC?: string,
    vBC?: number,
    pICMS?: number,
    vICMSOp?: number,
    pDif?: number,
    vICMSDif?: number,
    vICMS?: number,
    vBCFCP?: number,
    vFCP?: number,
    pFCPDif?: number,
    vFCPDif?: number,
    vFCPEfet?: number,
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC;
    this.pRedBC = data.pRedBC;
    this.cBenefRBC = data.cBenefRBC;
    this.vBC = data.vBC;
    this.pICMS = data.pICMS;
    this.vICMSOp = data.vICMSOp;
    this.pDif = data.pDif;
    this.vICMSDif = data.vICMSDif;
    this.vICMS = data.vICMS;
    this.vBCFCP = data.vBCFCP;
    this.vFCP = data.vFCP;
    this.pFCPDif = data.pFCPDif;
    this.vFCPDif = data.vFCPDif;
    this.vFCPEfet = data.vFCPEfet;

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
      throw new Error(`
        Modalidade de determinação da BC do ICMS (modBC) deve ser uma das seguintes:
        0 - Margem Valor Agregado (%); 1 - Pauta (Valor R$); 2 - Preço Tabelado Máximo (Valor R$); 3 - Valor da operação (Valor R$), se informado.
      `);
    }

    if (this.pRedBC !== undefined && (typeof this.pRedBC !== 'number' || this.pRedBC < 0 || this.pRedBC > 100)) {
      throw new Error('Percentual de redução da BC (pRedBC) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.cBenefRBC !== undefined && typeof this.cBenefRBC !== 'string') {
      throw new Error('Código do benefício fiscal na BC (cBenefRBC) deve ser uma string, se informado.');
    }

    if (this.vBC !== undefined && (typeof this.vBC !== 'number' || this.vBC < 0)) {
      throw new Error('Valor da BC do ICMS (vBC) deve ser um número não negativo, se informado.');
    }

    if (this.pICMS !== undefined && (typeof this.pICMS !== 'number' || this.pICMS < 0 || this.pICMS > 100)) {
      throw new Error('Alíquota do ICMS (pICMS) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSOp !== undefined && (typeof this.vICMSOp !== 'number' || this.vICMSOp < 0)) {
      throw new Error('Valor do ICMS da Operação (vICMSOp) deve ser um número não negativo, se informado.');
    }

    if (this.pDif !== undefined && (typeof this.pDif !== 'number' || this.pDif < 0 || this.pDif > 100)) {
      throw new Error('Percentual do diferimento (pDif) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vICMSDif !== undefined && (typeof this.vICMSDif !== 'number' || this.vICMSDif < 0)) {
      throw new Error('Valor do ICMS diferido (vICMSDif) deve ser um número não negativo, se informado.');
    }

    if (this.vICMS !== undefined && (typeof this.vICMS !== 'number' || this.vICMS < 0)) {
      throw new Error('Valor do ICMS (vICMS) deve ser um número não negativo, se informado.');
    }

    if (this.vBCFCP !== undefined && (typeof this.vBCFCP !== 'number' || this.vBCFCP < 0)) {
      throw new Error('Valor da BC do FCP (vBCFCP) deve ser um número não negativo, se informado.');
    }

    if (this.vFCP !== undefined && (typeof this.vFCP !== 'number' || this.vFCP < 0)) {
      throw new Error('Valor do FCP (vFCP) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPDif !== undefined && (typeof this.pFCPDif !== 'number' || this.pFCPDif < 0 || this.pFCPDif > 100)) {
      throw new Error('Percentual do FCP diferido (pFCPDif) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPDif !== undefined && (typeof this.vFCPDif !== 'number' || this.vFCPDif < 0)) {
      throw new Error('Valor do FCP diferido (vFCPDif) deve ser um número não negativo, se informado.');
    }

    if (this.vFCPEfet !== undefined && (typeof this.vFCPEfet !== 'number' || this.vFCPEfet < 0)) {
      throw new Error('Valor do FCP efetivo (vFCPEfet) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other: ICMS51): boolean {
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
        pRedBC: this.pRedBC?.toFixed(2),
        cBenefRBC: this.cBenefRBC,
        vBC: this.vBC?.toFixed(2),
        pICMS: this.pICMS?.toFixed(2),
        vICMSOp: this.vICMSOp?.toFixed(2),
        pDif: this.pDif?.toFixed(2),
        vICMSDif: this.vICMSDif?.toFixed(2),
        vICMS: this.vICMS?.toFixed(2),
        vBCFCP: this.vBCFCP?.toFixed(2),
        vFCP: this.vFCP?.toFixed(2),
        pFCPDif: this.pFCPDif?.toFixed(2),
        vFCPDif: this.vFCPDif?.toFixed(2),
        vFCPEfet: this.vFCPEfet?.toFixed(2),
      }
    };
  }
}