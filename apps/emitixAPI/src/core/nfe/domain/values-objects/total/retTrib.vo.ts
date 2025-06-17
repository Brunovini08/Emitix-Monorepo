export class retTrib {

  vRetPIS
  vRetCOFINS
  vRetCSLL
  vBCIRRF
  vIRRF
  vBCRetPrev
  vRetPRev

  constructor(
    vRetPIS = undefined,
    vRetCOFINS = undefined,
    vRetCSLL = undefined,
    vBCIRRF = undefined,
    vIRRF = undefined,
    vBCRetPrev = undefined,
    vRetPRev = undefined
  ) {
    this.vRetPIS = vRetPIS;
    this.vRetCOFINS = vRetCOFINS;
    this.vRetCSLL = vRetCSLL;
    this.vBCIRRF = vBCIRRF;
    this.vIRRF = vIRRF;
    this.vBCRetPrev = vBCRetPrev;
    this.vRetPRev = vRetPRev;
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