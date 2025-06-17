import type { ICMSTot } from "./ICMSTot.vo";
import type { ISSQNTot } from "./ISSQNTot.vo";
import type { retTrib } from "./retTrib.vo";

export class Total {
  ICMSTot: ICMSTot;
  ISSQNtot: ISSQNTot;
  retTrib: retTrib;

  constructor(
    ICMSTot: ICMSTot,
    ISSQNtot: ISSQNTot,
    retTrib: retTrib
  ) {
    this.ICMSTot = ICMSTot;
    this.ISSQNtot = ISSQNtot;
    this.retTrib = retTrib;
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
  }

  toJson() {
    return {
      ICMSTot: this.ICMSTot.toJson(),
      ISSQNtot: this.ISSQNtot.toJson(),
      retTrib: this.retTrib.toJson(),
    };
  }
}