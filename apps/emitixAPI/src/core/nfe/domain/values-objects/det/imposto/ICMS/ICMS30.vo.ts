const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS30 {
  public readonly orig;
  public readonly CST;
  public readonly modBCST;
  public readonly pMVAST;
  public readonly pRedBCST;
  public readonly vBCST;
  public readonly pICMSST;
  public readonly vICMSST;
  public readonly vBCFCPST;
  public readonly pFCPST;
  public readonly vFCPST;
  public readonly vICMSDeson;
  public readonly motDesICMS;
  public readonly indDeduzDeson;

  constructor(data) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBCST = data.modBCST;
    this.pMVAST = data.pMVAST ?? null;
    this.pRedBCST = data.pRedBCST ?? null;
    this.vBCST = data.vBCST;
    this.pICMSST = data.pICMSST;
    this.vICMSST = data.vICMSST;
    this.vBCFCPST = data.vBCFCPST ?? null;
    this.pFCPST = data.pFCPST ?? null;
    this.vFCPST = data.vFCPST ?? null;
    this.vICMSDeson = data.vICMSDeson ?? null;
    this.motDesICMS = data.motDesICMS ?? null;
    this.indDeduzDeson = data.indDeduzDeson ?? null;

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
    if (this.CST !== '30') {
      throw new Error('CST para ICMS30 deve ser obrigatoriamente "30".');
    }

    const allowedModBCST = ['0', '1', '2', '3', '4', '5', '6']; // Assuming '5' and '6' were implied by the original DTO's @IsIn values
    if (this.modBCST === undefined || typeof this.modBCST !== 'string' || !allowedModBCST.includes(this.modBCST)) {
      throw new Error(`
        Modalidade de determinação da BC do ICMS ST (modBCST) é obrigatória e deve ser uma das seguintes:
        0 - Preço tabelado ou máximo sugerido; 1 - Lista Negativa; 2 - Lista Positiva; 3 - Lista Neutra;
        4 - Margem Valor Agregado (%); 5 - Pauta; 6 - Valor da Operação.
      `);
    }

    if (this.pMVAST !== null && (typeof this.pMVAST !== 'number' || this.pMVAST < 0 || this.pMVAST > 100)) {
      throw new Error('Percentual da Margem de Valor Adicionado ICMS ST (pMVAST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pRedBCST !== null && (typeof this.pRedBCST !== 'number' || this.pRedBCST < 0 || this.pRedBCST > 100)) {
      throw new Error('Percentual de redução da BC ICMS ST (pRedBCST) deve ser um número entre 0 e 100, se informado.');
    }

    if (typeof this.vBCST !== 'number' || this.vBCST < 0) {
      throw new Error('Valor da BC do ICMS ST (vBCST) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pICMSST !== 'number' || this.pICMSST < 0 || this.pICMSST > 100) {
      throw new Error('Alíquota do ICMS ST (pICMSST) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vICMSST !== 'number' || this.vICMSST < 0) {
      throw new Error('Valor do ICMS ST (vICMSST) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCPST !== null && (typeof this.vBCFCPST !== 'number' || this.vBCFCPST < 0)) {
      throw new Error('Valor da BC do FCP ST (vBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== null && (typeof this.pFCPST !== 'number' || this.pFCPST < 0 || this.pFCPST > 100)) {
      throw new Error('Alíquota do FCP ST (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPST !== null && (typeof this.vFCPST !== 'number' || this.vFCPST < 0)) {
      throw new Error('Valor do FCP ST (vFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSDeson !== null && (typeof this.vICMSDeson !== 'number' || this.vICMSDeson < 0)) {
      throw new Error('Valor do ICMS desonerado (vICMSDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMS = ['6', '7', '9'];
    if (this.motDesICMS !== null && typeof this.motDesICMS !== 'string' && !allowedMotDesICMS.includes(this.motDesICMS)) {
        throw new Error(`Motivo da desoneração do ICMS (motDesICMS) deve ser '6', '7' ou '9', se informado.`);
    }
    
    const allowedIndDeduzDeson = ['0', '1'];
    if (this.indDeduzDeson !== null && typeof this.indDeduzDeson !== 'string' && !allowedIndDeduzDeson.includes(this.indDeduzDeson)) {
        throw new Error(`Indica se o valor do ICMS desonerado deduz do valor do item (indDeduzDeson) deve ser '0' ou '1', se informado.`);
    }
  }

  public equals(other) {
    if (!(other instanceof ICMS30)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.modBCST === other.modBCST &&
      this.pMVAST === other.pMVAST &&
      this.pRedBCST === other.pRedBCST &&
      this.vBCST === other.vBCST &&
      this.pICMSST === other.pICMSST &&
      this.vICMSST === other.vICMSST &&
      this.vBCFCPST === other.vBCFCPST &&
      this.pFCPST === other.pFCPST &&
      this.vFCPST === other.vFCPST &&
      this.vICMSDeson === other.vICMSDeson &&
      this.motDesICMS === other.motDesICMS &&
      this.indDeduzDeson === other.indDeduzDeson
    );
  }

  public toJSON() {
    return {
      orig: this.orig,
      CST: this.CST,
      modBCST: this.modBCST,
      pMVAST: this.pMVAST,
      pRedBCST: this.pRedBCST,
      vBCST: this.vBCST,
      pICMSST: this.pICMSST,
      vICMSST: this.vICMSST,
      vBCFCPST: this.vBCFCPST,
      pFCPST: this.pFCPST,
      vFCPST: this.vFCPST,
      vICMSDeson: this.vICMSDeson,
      motDesICMS: this.motDesICMS,
      indDeduzDeson: this.indDeduzDeson,
    };
  }
}