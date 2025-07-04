import { DomainError } from "../../../errors/domain.error"

export class fat {

  nFat: string
  vOrig: string
  vDesc: string
  vLiq: string

  constructor(
    data: {
      nFat: string,
      vOrig: string,
      vDesc: string,
      vLiq: string
    }
  ) { 
    this.nFat = data.nFat;
    this.vOrig = data.vOrig;
    this.vDesc = data.vDesc;
    this.vLiq = data.vLiq;
  }

  validateOrThrow() {
    if (this.nFat !== undefined && this.nFat !== null) {
      if (this.nFat.length < 1 || this.nFat.length > 60) {
        throw new DomainError('O campo nFat deve ter entre 1 e 60 caracteres.');
      }
    }
  }

  toJSON() {
    return {
      nFat: this.nFat,
      vOrig: this.vOrig,
      vDesc: this.vDesc,
      vLiq: this.vLiq,
    };
  }
}