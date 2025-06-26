export class retTrib {

  vRetPIS?
  vRetCOFINS?
  vRetCSLL?
  vBCIRRF?
  vIRRF?
  vBCRetPrev?
  vRetPRev?

  constructor(
    data: {
      vRetPIS?,
      vRetCOFINS?,
      vRetCSLL?,
      vBCIRRF?,
      vIRRF?,
      vBCRetPrev?,
      vRetPRev?
    }
  ) {
    this.vRetPIS = data.vRetPIS || undefined;
    this.vRetCOFINS = data.vRetCOFINS || undefined;
    this.vRetCSLL = data.vRetCSLL || undefined;
    this.vBCIRRF = data.vBCIRRF || undefined;
    this.vIRRF = data.vIRRF || undefined;
    this.vBCRetPrev = data.vBCRetPrev || undefined;
    this.vRetPRev = data.vRetPRev || undefined;
  }

  validateOrThrow() {

  }

  toJSON() {
    return {
      vRetPIS: this.vRetPIS,
      vRetCOFINS: this.vRetCOFINS,
      vRetCSLL: this.vRetCSLL,
      vBCIRRF: this.vBCIRRF,
      vIRRF: this.vIRRF,
      vBCRetPrev: this.vBCRetPrev,
      vRetPRev: this.vRetPRev,
    };
  }
}