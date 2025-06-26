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
  public readonly pMVAST?: string | undefined;
  public readonly pRedBCST?: string | undefined;
  public readonly vBCST;
  public readonly pICMSST;
  public readonly vICMSST;
  public readonly vBCFCPST?: string | undefined;
  public readonly pFCPST?: string | undefined;
  public readonly vFCPST?: string | undefined;
  public readonly vICMSDeson?: string | undefined;
  public readonly motDesICMS?: string | undefined;
  public readonly indDeduzDeson?: string | undefined;

  constructor(data: { orig: string,
     CST: string, 
     modBCST: string,
     pMVAST?: string | undefined,
     pRedBCST?: string | undefined,
     vBCST: string,
     pICMSST: string,
     vICMSST: string,
     vBCFCPST?: string | undefined,
     pFCPST?: string | undefined,
     vFCPST?: string | undefined,
     vICMSDeson?: string | undefined,
     motDesICMS?: string | undefined,
     indDeduzDeson?: string | undefined
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBCST = data.modBCST;
    this.pMVAST = data.pMVAST ?? undefined;
    this.pRedBCST = data.pRedBCST ?? undefined;
    this.vBCST = data.vBCST;
    this.pICMSST = data.pICMSST;
    this.vICMSST = data.vICMSST;
    this.vBCFCPST = data.vBCFCPST ?? undefined;
    this.pFCPST = data.pFCPST ?? undefined;
    this.vFCPST = data.vFCPST ?? undefined;
    this.vICMSDeson = data.vICMSDeson ?? undefined;
    this.motDesICMS = data.motDesICMS ?? undefined;
    this.indDeduzDeson = data.indDeduzDeson ?? undefined;

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

    if (this.pMVAST !== undefined && (typeof this.pMVAST !== 'string' || this.pMVAST.trim() === '')) {
      throw new Error('Percentual da Margem de Valor Adicionado ICMS ST (pMVAST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.pRedBCST !== undefined && (typeof this.pRedBCST !== 'string' || this.pRedBCST.trim() === '')) {
      throw new Error('Percentual de redução da BC ICMS ST (pRedBCST) deve ser um número entre 0 e 100, se informado.');
    }

    if (typeof this.vBCST !== 'string' || this.vBCST.trim() === '') {
      throw new Error('Valor da BC do ICMS ST (vBCST) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pICMSST !== 'string' || this.pICMSST.trim() === '') {
      throw new Error('Alíquota do ICMS ST (pICMSST) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vICMSST !== 'string' || this.vICMSST.trim() === '') {
      throw new Error('Valor do ICMS ST (vICMSST) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCPST !== undefined && (typeof this.vBCFCPST !== 'string' || this.vBCFCPST.trim() === '')) {
      throw new Error('Valor da BC do FCP ST (vBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== undefined && (typeof this.pFCPST !== 'string' || this.pFCPST.trim() === '')) {
      throw new Error('Alíquota do FCP ST (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPST !== undefined && (typeof this.vFCPST !== 'string' || this.vFCPST.trim() === '')) {
      throw new Error('Valor do FCP ST (vFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSDeson !== undefined && (typeof this.vICMSDeson !== 'string' || this.vICMSDeson.trim() === '')) {
      throw new Error('Valor do ICMS desonerado (vICMSDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMS = ['6', '7', '9'];
    if (this.motDesICMS !== undefined && typeof this.motDesICMS !== 'string' && !allowedMotDesICMS.includes(this.motDesICMS)) {
      throw new Error(`Motivo da desoneração do ICMS (motDesICMS) deve ser '6', '7' ou '9', se informado.`);
    }

    const allowedIndDeduzDeson = ['0', '1'];
    if (this.indDeduzDeson !== undefined && typeof this.indDeduzDeson !== 'string' && !allowedIndDeduzDeson.includes(this.indDeduzDeson)) {
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
      ICMS30: {
        orig: this.orig,
        CST: this.CST,
        modBCST: this.modBCST,
        pMVAST: this.pMVAST || undefined,
        pRedBCST: this.pRedBCST || undefined,
        vBCST: this.vBCST,
        pICMSST: this.pICMSST,
        vICMSST: this.vICMSST,
        vBCFCPST: this.vBCFCPST || undefined,
        pFCPST: this.pFCPST || undefined,
        vFCPST: this.vFCPST || undefined,
        vICMSDeson: this.vICMSDeson || undefined,
        motDesICMS: this.motDesICMS || undefined,
        indDeduzDeson: this.indDeduzDeson || undefined,
      }
    };
  }
}