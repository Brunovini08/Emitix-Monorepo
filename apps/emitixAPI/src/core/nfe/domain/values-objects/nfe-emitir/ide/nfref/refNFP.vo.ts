import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class RefNFP {
  public readonly cUF: string;
  public readonly AAMM: string;
  public readonly CNPJ?: string;
  public readonly CPF?: string;
  public readonly IE: string;
  public readonly mod: string;
  public readonly serie: string;
  public readonly nNF: string;

  constructor(data: {
    cUF: string;
    AAMM: string;
    CNPJ?: string;
    CPF?: string;
    IE: string;
    mod: string;
    serie: string;
    nNF: string;
  }) {
    this.cUF = data.cUF ?? undefined;
    this.AAMM = data.AAMM ?? undefined;
    this.CNPJ = data.CNPJ ;
    this.CPF = data.CPF ?? undefined;
    this.IE = data.IE ?? undefined;
    this.mod = data.mod;
    this.serie = data.serie;
    this.nNF = data.nNF;
  }

  public validateOrThrow(): void {
    if (!this.cUF) {
      throw new DomainError('cUF é obrigatório');
    }
    if (!this.AAMM) {
      throw new DomainError('AAMM é obrigatório');
    }
    if (!this.IE) {
      throw new DomainError('IE é obrigatório');
    }
    if (!this.mod) {
      throw new DomainError('mod é obrigatório');
    }
    if (!this.serie) {
      throw new DomainError('serie é obrigatório');
    }
    if (!this.nNF) {
      throw new DomainError('nNF é obrigatório');
    }
    if (!this.CNPJ && !this.CPF) {
      throw new DomainError('CNPJ ou CPF é obrigatório');
    }
    if (this.CNPJ && this.CPF) {
      throw new DomainError('CNPJ e CPF não podem ser informados juntos');
    }
  }

  toJSON() {
    return {
      refNFP: {
        cUF: this.cUF,
        AAMM: this.AAMM,
        CNPJ: this.CNPJ,
        CPF: this.CPF,
        IE: this.IE,
        mod: this.mod,
        serie: this.serie,
        nNF: this.nNF,
      }
    }
  }
}