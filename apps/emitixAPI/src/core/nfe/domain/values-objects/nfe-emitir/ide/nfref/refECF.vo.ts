import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class RefECF {
  public readonly mod: string;
  public readonly nECF: string;
  public readonly nCOO: string;

  constructor(data: {
    mod: string;
    nECF: string;
    nCOO: string;
  }) {
    this.mod = data.mod;
    this.nECF = data.nECF;
    this.nCOO = data.nCOO;
  }

  public validateOrThrow(): void {
    if (!this.mod) {
      throw new DomainError('mod é obrigatório');
    }
    if (!this.nECF) {
      throw new DomainError('nECF é obrigatório');
    }
    if (!this.nCOO) {
      throw new DomainError('nCOO é obrigatório');
    }
  }

  toJSON() {
    return {
      refECF: {
        mod: this.mod,
        nECF: this.nECF,
        nCOO: this.nCOO,
      }
    };
  }
}

