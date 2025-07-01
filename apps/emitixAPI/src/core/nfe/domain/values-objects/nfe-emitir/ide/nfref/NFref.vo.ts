import type { RefECF } from "./refECF.vo";
import type { RefNFP } from "./refNFP.vo";
import type { RefNF } from "./refNF.vo";

export class NFref {
  public readonly refNFe?: string;
  public readonly refNFeSig?: string;
  public readonly refNF?: RefNF
  public readonly refNFP?: RefNFP;
  public readonly refCTe?: string;
  public readonly refECF?: RefECF;

  constructor(data: {
    refNFe?: string;
    refNFeSig?: string;
    refNF?: RefNF;
    refNFP?: RefNFP;
    refCTe?: string;
    refECF?: RefECF;
  }) {
    this.refNFe = data.refNFe ?? undefined;
    this.refNFeSig = data.refNFeSig ?? undefined;
    this.refNF = data.refNF ?? undefined;
    this.refNFP = data.refNFP ?? undefined;
    this.refCTe = data.refCTe ?? undefined;
    this.refECF = data.refECF ?? undefined;
  }

  public validateOrThrow(): void {
    if (this.refNFe && this.refNFeSig) {
      throw new Error('refNFe e refNFeSig não podem ser informados juntos');
    }
    if (this.refNFe && this.refNF) {
      throw new Error('refNFe e refNF não podem ser informados juntos');
    }
    if (this.refNFe && this.refNFP) {
      throw new Error('refNFe e refNFP não podem ser informados juntos');
    }
    if (this.refNFe && this.refCTe) {
      throw new Error('refNFe e refCTe não podem ser informados juntos');
    }
    if (this.refNFe && this.refECF) {
      throw new Error('refNFe e refECF não podem ser informados juntos');
    }
    if (this.refNFeSig && this.refNF) {
      throw new Error('refNFeSig e refNF não podem ser informados juntos');
    }
    if (this.refNFeSig && this.refNFP) {
      throw new Error('refNFeSig e refNFP não podem ser informados juntos');
    }
    if (this.refNFeSig && this.refCTe) {
      throw new Error('refNFeSig e refCTe não podem ser informados juntos');
    }
    if (this.refNFeSig && this.refECF) {
      throw new Error('refNFeSig e refECF não podem ser informados juntos');
    }
    if (this.refNF && this.refNFP) {
      throw new Error('refNF e refNFP não podem ser informados juntos');
    }
    if (this.refNF && this.refCTe) {
      throw new Error('refNF e refCTe não podem ser informados juntos');
    }
    if (this.refNF && this.refECF) {
      throw new Error('refNF e refECF não podem ser informados juntos');
    }
    if (this.refNFP && this.refCTe) {
      throw new Error('refNFP e refCTe não podem ser informados juntos');
    }
    if (this.refNFP && this.refCTe) {
      throw new Error('refNFP e refCTe não podem ser informados juntos');
    }
    if (this.refNFP && this.refECF) {
      throw new Error('refNFP e refECF não podem ser informados juntos');
    }
    if (this.refCTe && this.refECF) {
      throw new Error('refCTe e refECF não podem ser informados juntos');
    }
  }

  toJSON() {
    return {
      refNFe: this.refNFe,
      refNFeSig: this.refNFeSig,
      refNF: this.refNF?.toJSON(),
      refNFP: this.refNFP?.toJSON(),
      refCTe: this.refCTe,
      refECF: this.refECF?.toJSON(),
    }
  }
}