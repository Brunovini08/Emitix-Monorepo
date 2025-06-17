export class retTrib {

  vRetPIS
  vRetCOFINS
  vRetCSLL
  vBCIRRF
  vIRRF
  vBCRetPrev
  vRetPRev

  constructor(
    data: {
      vRetPIS,
      vRetCOFINS,
      vRetCSLL,
      vBCIRRF,
      vIRRF,
      vBCRetPrev,
      vRetPRev
    }
  ) {
    this.vRetPIS = data.vRetPIS;
    this.vRetCOFINS = data.vRetCOFINS;
    this.vRetCSLL = data.vRetCSLL;
    this.vBCIRRF = data.vBCIRRF;
    this.vIRRF = data.vIRRF;
    this.vBCRetPrev = data.vBCRetPrev;
    this.vRetPRev = data.vRetPRev;
  }

  validateOrThrow() {

  }

  toJson() {
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