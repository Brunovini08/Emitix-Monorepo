import { ICMSTot } from "./ICMSTot.vo";
import type { ISSQNTot } from "./ISSQNTot.vo";
import type { retTrib } from "./retTrib.vo";
import type { ISTot } from "./ISTot.vo";
import type { IBSCBSTot } from "./IBSCBSTot.vo";
import type { vNFTot } from "./vNFTot.vo";

export class Total {
  ICMSTot: ICMSTot;
  ISSQNtot?: ISSQNTot;
  retTrib?: retTrib;
  ISTot?: ISTot;
  IBSCBSTot?: IBSCBSTot;
  vNFTot?: vNFTot;

  constructor(
    data: {
      ICMSTot: ICMSTot;
      ISSQNtot?: ISSQNTot;
      retTrib?: retTrib;
      ISTot?: ISTot;
      IBSCBSTot?: IBSCBSTot;
      vNFTot?: vNFTot;
    }
  ) {
    this.ICMSTot = data.ICMSTot;
    this.ISSQNtot = data.ISSQNtot || undefined;
    this.retTrib = data.retTrib || undefined;
    this.ISTot = data.ISTot || undefined;
    this.IBSCBSTot = data.IBSCBSTot || undefined;
    this.vNFTot = data.vNFTot || undefined;
  }

  validateOrThrow() {
    if (this.ICMSTot === undefined || this.ICMSTot === null) {
      throw new Error('O campo ICMSTot é obrigatório');
    }

    this.ICMSTot.validateOrThrow();

    if (this.ISSQNtot !== undefined && this.ISSQNtot !== null) {
      this.ISSQNtot.validateOrThrow();
    }

    if (this.retTrib !== undefined && this.retTrib !== null) {
      this.retTrib.validateOrThrow();
    }

    if (this.ISTot !== undefined && this.ISTot !== null) {
      this.ISTot.validateOrThrow();
    }

    if (this.IBSCBSTot !== undefined && this.IBSCBSTot !== null) {
      this.IBSCBSTot.validateOrThrow();
    }

    if (this.vNFTot !== undefined && this.vNFTot !== null) {
      this.vNFTot.validateOrThrow();
    }
  }

  toJSON() {
    return {
      ICMSTot: this.ICMSTot.toJson(),
      ISSQNtot: this.ISSQNtot ? this.ISSQNtot.toJSON() : undefined,
      retTrib: this.retTrib ? this.retTrib.toJSON() : undefined,
      ISTot: this.ISTot ? this.ISTot.toJSON() : undefined,
      IBSCBSTot: this.IBSCBSTot ? this.IBSCBSTot.toJSON() : undefined,
      vNFTot: this.vNFTot ? this.vNFTot.toJSON() : undefined,
    };
  }
}