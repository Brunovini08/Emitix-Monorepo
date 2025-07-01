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
      throw new Error('mod é obrigatório');
    }
    if (!this.nECF) {
      throw new Error('nECF é obrigatório');
    }
    if (!this.nCOO) {
      throw new Error('nCOO é obrigatório');
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

