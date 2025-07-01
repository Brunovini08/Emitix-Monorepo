const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS10 {
  public readonly orig: string;
  public readonly CST: string;
  public readonly modBC: string;
  public readonly vBC: number;
  public readonly pICMS: number;
  public readonly vICMS: number;
  public readonly vBCFCP?: number;
  public readonly pFCP?: number;
  public readonly vFCP?: number;
  public readonly modBCST: string;
  public readonly pMVAST?: number;
  public readonly pRedBCST?: number;
  public readonly vBCST: number;
  public readonly pICMSST?: number;
  public readonly VICMSST?: number;
  public readonly vBCFCPST?: number;
  public readonly pFCPST?: number;
  public readonly vFCPPST?: number;
  public readonly vICMSSTDeson?: number;
  public readonly motDesICMSST?: string;

  constructor(data: {
    orig: string,
    CST: string,
    modBC: string,
    vBC: number,
    pICMS: number,
    vICMS: number,
    vBCFCP?: number,
    pFCP?: number,
    vFCP?: number,
    modBCST: string,
    pMVAST?: number,
    pRedBCST?: number,
    vBCST: number,
    pICMSST?: number,
    VICMSST?: number,
    vBCFCPST?: number,
    pFCPST?: number,
    vFCPPST?: number,
    vICMSSTDeson?: number,
    motDesICMSST?: string,
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC;
    this.vBC = data.vBC;
    this.pICMS = data.pICMS;
    this.vICMS = data.vICMS;
    this.vBCFCP = data.vBCFCP;
    this.pFCP = data.pFCP;
    this.vFCP = data.vFCP;
    this.modBCST = data.modBCST;
    this.pMVAST = data.pMVAST;
    this.pRedBCST = data.pRedBCST;
    this.vBCST = data.vBCST;
    this.pICMSST = data.pICMSST;
    this.VICMSST = data.VICMSST;
    this.vBCFCPST = data.vBCFCPST;
    this.pFCPST = data.pFCPST;
    this.vFCPPST = data.vFCPPST;
    this.vICMSSTDeson = data.vICMSSTDeson;
    this.motDesICMSST = data.motDesICMSST;

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
    if (this.CST !== '10') {
      throw new Error('CST para ICMS10 deve ser obrigatoriamente "10".');
    }

    const allowedModBC = ['0', '1', '2', '3'];
    if (this.modBC === undefined || typeof this.modBC !== 'string' || !allowedModBC.includes(this.modBC)) {
      throw new Error(`
        Modalidade de determinação da BC do ICMS (modBC) é obrigatória e deve ser uma das seguintes:
        0 - Margem Valor Agregado (%), 1 - Pauta (valor), 2 - Preço Tabelado Máximo (valor), 3 - Valor da Operação
      `);
    }

    if (typeof this.vBC !== 'number' || this.vBC < 0) {
      throw new Error('Valor da BC do ICMS (vBC) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pICMS !== 'number' || this.pICMS < 0 || this.pICMS > 100) {
      throw new Error('Alíquota do ICMS (pICMS) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vICMS !== 'number' || this.vICMS < 0) {
      throw new Error('Valor do ICMS (vICMS) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCP !== undefined && (typeof this.vBCFCP !== 'number' || this.vBCFCP < 0)) {
      throw new Error('Valor da BC do FCP (vBCFCP) deve ser um número não negativo, se informado.');
    }

    if (this.pFCP !== undefined && (typeof this.pFCP !== 'number' || this.pFCP < 0 || this.pFCP > 100)) {
      throw new Error('Alíquota do FCP (pFCP) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCP !== undefined && (typeof this.vFCP !== 'number' || this.vFCP < 0)) {
      throw new Error('Valor do FCP (vFCP) deve ser um número não negativo, se informado.');
    }

    const allowedModBCST = ['0', '1', '2', '3', '4', '5', '6'];
    if (this.modBCST === undefined || typeof this.modBCST !== 'string' || !allowedModBCST.includes(this.modBCST)) {
      throw new Error(`
        Modalidade de determinação da BC do ICMS ST (modBCST) é obrigatória e deve ser uma das seguintes:
        0 - Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor);
        4 - Margem Valor Agregado (%); 5 - Pauta (valor); 6 - Valor da Operação.
      `);
    }

    if (this.pMVAST !== undefined && (typeof this.pMVAST !== 'number' || this.pMVAST < 0 || this.pMVAST > 100)) {
      throw new Error('Percentual da Margem de Valor Adicionado ICMS ST (pMVAST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pRedBCST !== undefined && (typeof this.pRedBCST !== 'number' || this.pRedBCST < 0 || this.pRedBCST > 100)) {
      throw new Error('Percentual de redução da BC ICMS ST (pRedBCST) deve ser um número entre 0 e 100, se informado.');
    }

    if (typeof this.vBCST !== 'number' || this.vBCST < 0) {
      throw new Error('Valor da BC do ICMS ST (vBCST) é obrigatório e deve ser um número não negativo.');
    }

    if (this.pICMSST !== undefined && (typeof this.pICMSST !== 'number' || this.pICMSST < 0 || this.pICMSST > 100)) {
      throw new Error('Alíquota do ICMS ST (pICMSST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.VICMSST !== undefined && (typeof this.VICMSST !== 'number' || this.VICMSST < 0)) {
      throw new Error('Valor do ICMS ST (VICMSST) deve ser um número não negativo, se informado.');
    }

    if (this.vBCFCPST !== undefined && (typeof this.vBCFCPST !== 'number' || this.vBCFCPST < 0)) {
      throw new Error('Valor da BC do ICMS FCP ST (vBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== undefined && (typeof this.pFCPST !== 'number' || this.pFCPST < 0 || this.pFCPST > 100)) {
      throw new Error('Percentual do ICMS FCP ST (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPPST !== undefined && (typeof this.vFCPPST !== 'number' || this.vFCPPST < 0)) {
      throw new Error('Valor do ICMS FCP ST (vFCPPST) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSSTDeson !== undefined && (typeof this.vICMSSTDeson !== 'number' || this.vICMSSTDeson < 0)) {
      throw new Error('Valor do ICMS ST desonerado (vICMSSTDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMSST = ['3', '9', '12'];
    if (this.motDesICMSST !== undefined && typeof this.motDesICMSST !== 'string' && !allowedMotDesICMSST.includes(this.motDesICMSST)) {
      throw new Error(`Motivo da desoneração do ICMS ST (motDesICMSST) deve ser '3', '9' ou '12', se informado.`);
    }
  }

  public equals(other: ICMS10): boolean {
    if (!(other instanceof ICMS10)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.modBC === other.modBC &&
      this.vBC === other.vBC &&
      this.pICMS === other.pICMS &&
      this.vICMS === other.vICMS &&
      this.vBCFCP === other.vBCFCP &&
      this.pFCP === other.pFCP &&
      this.vFCP === other.vFCP &&
      this.modBCST === other.modBCST &&
      this.pMVAST === other.pMVAST &&
      this.pRedBCST === other.pRedBCST &&
      this.vBCST === other.vBCST &&
      this.pICMSST === other.pICMSST &&
      this.VICMSST === other.VICMSST &&
      this.vBCFCPST === other.vBCFCPST &&
      this.pFCPST === other.pFCPST &&
      this.vFCPPST === other.vFCPPST &&
      this.vICMSSTDeson === other.vICMSSTDeson &&
      this.motDesICMSST === other.motDesICMSST
    );
  }

  public toJSON() {
    return {
      ICMS10: {
        orig: this.orig,
        CST: this.CST,
        modBC: this.modBC,
        vBC: this.vBC.toFixed(2),
        pICMS: this.pICMS.toFixed(2),
        vICMS: this.vICMS.toFixed(2),
        vBCFCP: this.vBCFCP?.toFixed(2),
        pFCP: this.pFCP?.toFixed(2),
        vFCP: this.vFCP?.toFixed(2),
        modBCST: this.modBCST,
        pMVAST: this.pMVAST?.toFixed(2),
        pRedBCST: this.pRedBCST?.toFixed(2),
        vBCST: this.vBCST.toFixed(2),
        pICMSST: this.pICMSST?.toFixed(2),
        VICMSST: this.VICMSST?.toFixed(2),
        vBCFCPST: this.vBCFCPST?.toFixed(2),
        pFCPST: this.pFCPST?.toFixed(2),
        vFCPPST: this.vFCPPST?.toFixed(2),
        vICMSSTDeson: this.vICMSSTDeson?.toFixed(2),
        motDesICMSST: this.motDesICMSST,
      }
    };
  }
}