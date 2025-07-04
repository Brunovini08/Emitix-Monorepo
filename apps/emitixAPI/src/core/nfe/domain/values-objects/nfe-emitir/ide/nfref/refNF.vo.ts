import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class RefNF {
  public readonly cUF: string;
  public readonly AAMM: string;
  public readonly CNPJ: string;
  public readonly mod: string;
  public readonly serie: string;
  public readonly nNF: string;

  constructor(data: {
    cUF: string;
    AAMM: string;
    CNPJ: string;
    mod: string;
    serie: string;
    nNF: string;
  }) {}

  public validateOrThrow(): void {
    if (!this.cUF) {
      throw new DomainError('cUF é obrigatório');
    }
    if (!this.AAMM) {
      throw new DomainError('AAMM é obrigatório');
    }
    if (!this.CNPJ) {
      throw new DomainError('CNPJ é obrigatório');
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
  }

  toJSON() {
    return {
      refNF: {
        cUF: this.cUF,
        AAMM: this.AAMM,
        CNPJ: this.CNPJ,
        mod: this.mod,
        serie: this.serie,
        nNF: this.nNF,
      }
    }
  }
}