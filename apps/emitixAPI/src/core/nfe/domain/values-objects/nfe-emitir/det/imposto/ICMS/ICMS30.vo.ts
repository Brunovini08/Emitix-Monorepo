import { DomainError } from "src/core/nfe/domain/errors/domain.error";

const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS30 {
  public readonly orig: string;
  public readonly CST: string;
  public readonly modBCST: string;
  public readonly pMVAST: number;
  public readonly pRedBCST: number;
  public readonly vBCST: number;
  public readonly pICMSST: number;
  public readonly vICMSST: number;
  public readonly vBCFCPST?: number;
  public readonly pFCPST?: number;
  public readonly vFCPST?: number;
  public readonly vICMSDeson?: number;
  public readonly motDesICMS?: string;
  public readonly indDeduzDeson?: string;

  constructor(data: {
    orig: string,
    CST: string,
    modBCST: string,
    pMVAST: number,
    pRedBCST: number,
    vBCST: number,
    pICMSST: number,
    vICMSST: number,
    vBCFCPST?: number,
    pFCPST?: number,
    vFCPST?: number,
    vICMSDeson?: number,
    motDesICMS?: string,
    indDeduzDeson?: string,
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBCST = data.modBCST;
    this.pMVAST = data.pMVAST;
    this.pRedBCST = data.pRedBCST;
    this.vBCST = data.vBCST;
    this.pICMSST = data.pICMSST;
    this.vICMSST = data.vICMSST;
    this.vBCFCPST = data.vBCFCPST;
    this.pFCPST = data.pFCPST;
    this.vFCPST = data.vFCPST;
    this.vICMSDeson = data.vICMSDeson;
    this.motDesICMS = data.motDesICMS;
    this.indDeduzDeson = data.indDeduzDeson;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (this.orig === undefined || !(Object.values(TorigEnum).includes(this.orig))) {
      throw new DomainError(`
        Origem da mercadoria (orig) é obrigatória e deve ser um dos seguintes valores:
        ${Object.values(TorigEnum).join(', ')} (0 - Nacional, 1 - Estrangeira - Importação direta, 2 - Estrangeira - Adquirida no mercado interno)
      `);
    }

    if (this.CST === undefined || typeof this.CST !== 'string' || this.CST.trim() === '') {
      throw new DomainError('Código de Situação Tributária (CST) do ICMS é obrigatório.');
    }
    if (this.CST !== '30') {
      throw new DomainError('CST para ICMS30 deve ser obrigatoriamente "30".');
    }

    const allowedModBCST = ['0', '1', '2', '3', '4', '5', '6'];
    if (this.modBCST === undefined || typeof this.modBCST !== 'string' || !allowedModBCST.includes(this.modBCST)) {
      throw new DomainError(`
        Modalidade de determinação da BC do ICMS ST (modBCST) é obrigatória e deve ser uma das seguintes:
        0 - Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor);
        4 - Margem Valor Agregado (%); 5 - Pauta (valor); 6 - Valor da Operação.
      `);
    }

    if (typeof this.pMVAST !== 'number' || this.pMVAST < 0 || this.pMVAST > 100) {
      throw new DomainError('Percentual da Margem de Valor Adicionado ICMS ST (pMVAST) é obrigatório e deve ser um número entre 0 e 100.');
    }

    if (typeof this.pRedBCST !== 'number' || this.pRedBCST < 0 || this.pRedBCST > 100) {
      throw new DomainError('Percentual de redução da BC ICMS ST (pRedBCST) é obrigatório e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vBCST !== 'number' || this.vBCST < 0) {
      throw new DomainError('Valor da BC do ICMS ST (vBCST) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pICMSST !== 'number' || this.pICMSST < 0 || this.pICMSST > 100) {
      throw new DomainError('Alíquota do ICMS ST (pICMSST) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vICMSST !== 'number' || this.vICMSST < 0) {
      throw new DomainError('Valor do ICMS ST (vICMSST) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCPST !== undefined && (typeof this.vBCFCPST !== 'number' || this.vBCFCPST < 0)) {
      throw new DomainError('Valor da BC do ICMS FCP ST (vBCFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPST !== undefined && (typeof this.pFCPST !== 'number' || this.pFCPST < 0 || this.pFCPST > 100)) {
      throw new DomainError('Percentual do ICMS FCP ST (pFCPST) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCPST !== undefined && (typeof this.vFCPST !== 'number' || this.vFCPST < 0)) {
      throw new DomainError('Valor do ICMS FCP ST (vFCPST) deve ser um número não negativo, se informado.');
    }

    if (this.vICMSDeson !== undefined && (typeof this.vICMSDeson !== 'number' || this.vICMSDeson < 0)) {
      throw new DomainError('Valor do ICMS desonerado (vICMSDeson) deve ser um número não negativo, se informado.');
    }

    const allowedMotDesICMS = ['3', '9', '12'];
    if (this.motDesICMS !== undefined && typeof this.motDesICMS !== 'string' && !allowedMotDesICMS.includes(this.motDesICMS)) {
      throw new DomainError(`Motivo da desoneração do ICMS (motDesICMS) deve ser '3', '9' ou '12', se informado.`);
    }

    const allowedIndDeduzDeson = ['0', '1'];
    if (this.indDeduzDeson !== undefined && typeof this.indDeduzDeson !== 'string' && !allowedIndDeduzDeson.includes(this.indDeduzDeson)) {
      throw new DomainError(`Indica se o valor do ICMS desonerado deduz do valor do item (indDeduzDeson) deve ser '0' ou '1', se informado.`);
    }
  }

  public equals(other: ICMS30): boolean {
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
        pMVAST: this.pMVAST.toFixed(2),
        pRedBCST: this.pRedBCST.toFixed(2),
        vBCST: this.vBCST.toFixed(2),
        pICMSST: this.pICMSST.toFixed(2),
        vICMSST: this.vICMSST.toFixed(2),
        vBCFCPST: this.vBCFCPST?.toFixed(2),
        pFCPST: this.pFCPST?.toFixed(2),
        vFCPST: this.vFCPST?.toFixed(2),
        vICMSDeson: this.vICMSDeson?.toFixed(2),
        motDesICMS: this.motDesICMS,
        indDeduzDeson: this.indDeduzDeson,
      }
    };
  }
}