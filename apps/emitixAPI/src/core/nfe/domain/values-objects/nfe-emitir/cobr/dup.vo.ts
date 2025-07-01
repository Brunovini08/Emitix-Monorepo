export class dup {

  nDUp: string
  dVenc: string
  vDup: string

  constructor(
    data: {
      vDup: string,
      nDUp: string,
      dVenc: string
    }
  ) {
    this.nDUp = data.nDUp;
    this.dVenc = data.dVenc;
    this.vDup = data.vDup;
  }

  validateOrThrow() {
    if (this.vDup === undefined || this.vDup === null) {
      throw new Error('O campo vDup é obrigatório');
    }

    if (this.nDUp !== undefined && this.nDUp !== null) {
      if (this.nDUp.length < 1 || this.nDUp.length > 60) {
        throw new Error('O campo nDUp deve ter entre 1 e 60 caracteres.');
      }
    }
  }

  toJSON() {
    return {
      nDUp: this.nDUp,
      dVenc: this.dVenc,
      vDup: this.vDup,
    };
  }
}