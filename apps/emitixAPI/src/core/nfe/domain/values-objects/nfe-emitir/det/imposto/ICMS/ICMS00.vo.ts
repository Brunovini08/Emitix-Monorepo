import { DomainError } from "src/core/nfe/domain/errors/domain.error";

const TorigEnum = {
  NACIONAL: '0',
  ESTRANGEIRA_IMPORTACAO_DIRETA: '1',
  ESTRANGEIRA_MERCADO_INTERNO: '2',
};
Object.freeze(TorigEnum);

export class ICMS00 {
  public readonly orig: string;
  public readonly CST: string;
  public readonly modBC: string;
  public readonly vBC: number;
  public readonly pICMS: number;
  public readonly vICMS: number;
  public readonly pFCP?: number;
  public readonly vFCP?: number;

  constructor(data: {
    orig: string,
    CST: string,
    modBC: string,
    vBC: number,
    pICMS: number,
    vICMS: number,
    pFCP?: number,
    vFCP?: number
   }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.modBC = data.modBC;
    this.vBC = data.vBC;
    this.pICMS = data.pICMS;
    this.vICMS = data.vICMS;
    this.pFCP = data.pFCP;
    this.vFCP = data.vFCP;

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
    if (this.CST !== '00') {
      throw new DomainError('CST para ICMS00 deve ser obrigatoriamente "00".');
    }

    const allowedModBC = ['0', '1', '2', '3'];
    if (this.modBC === undefined || typeof this.modBC !== 'string' || !allowedModBC.includes(this.modBC)) {
      throw new DomainError(`
        Modalidade de determinação da BC do ICMS (modBC) é obrigatória e deve ser uma das seguintes:
        0 - Margem Valor Agregado (%), 1 - Pauta (valor), 2 - Preço Tabelado Máximo (valor), 3 - Valor da Operação
      `);
    }

    if (typeof this.vBC !== 'number' || this.vBC < 0) {
      throw new DomainError('Valor da BC do ICMS (vBC) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.pICMS !== 'number' || this.pICMS < 0 || this.pICMS > 100) {
      throw new DomainError('Alíquota do ICMS (pICMS) é obrigatória e deve ser um número entre 0 e 100.');
    }

    if (typeof this.vICMS !== 'number' || this.vICMS < 0) {
      throw new DomainError('Valor do ICMS (vICMS) é obrigatório e deve ser um número não negativo.');
    }

    if (this.pFCP !== undefined && (typeof this.pFCP !== 'number' || this.pFCP < 0 || this.pFCP > 100)) {
      throw new DomainError('Alíquota do FCP (pFCP) deve ser um número entre 0 e 100, se informado.');
    }

    if (this.vFCP !== undefined && (typeof this.vFCP !== 'number' || this.vFCP < 0)) {
      throw new DomainError('Valor do FCP (vFCP) deve ser um número não negativo, se informado.');
    }
  }

  public equals(other: ICMS00): boolean {
    if (!(other instanceof ICMS00)) {
      return false;
    }
    return (
      this.orig === other.orig &&
      this.CST === other.CST &&
      this.modBC === other.modBC &&
      this.vBC === other.vBC &&
      this.pICMS === other.pICMS &&
      this.vICMS === other.vICMS &&
      this.pFCP === other.pFCP &&
      this.vFCP === other.vFCP
    );
  }

  public toJSON() {
    return {
      ICMS00: {
        orig: this.orig,
        CST: this.CST,
        modBC: this.modBC,
        vBC: this.vBC.toFixed(2),
        pICMS: this.pICMS.toFixed(2),
        vICMS: this.vICMS.toFixed(2),
        pFCP: this.pFCP?.toFixed(2),
        vFCP: this.vFCP?.toFixed(2),
      }
    };
  }
}