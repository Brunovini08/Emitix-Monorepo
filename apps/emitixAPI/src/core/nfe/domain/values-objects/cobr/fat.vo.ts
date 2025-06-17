export class fat {

  nFat
  vOrig
  vDesc
  vLiq

  constructor(
    nFat,
    vOrig,
    vDesc,
    vLiq
  ) {
    this.nFat = nFat;
    this.vOrig = vOrig;
    this.vDesc = vDesc;
    this.vLiq = vLiq;
  }

  validateOrThrow() {
    if (this.nFat !== undefined && this.nFat !== null) {
      if (this.nFat.length < 1 || this.nFat.length > 60) {
        throw new Error('O campo nFat deve ter entre 1 e 60 caracteres.');
      }
    }
  }

  toJson() {
    return {
      nFat: this.nFat,
      vOrig: this.vOrig,
      vDesc: this.vDesc,
      vLiq: this.vLiq,
    };
  }
}