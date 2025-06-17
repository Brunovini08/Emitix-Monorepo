export class dup {

  nDUp
  dVenc
  vDup

  constructor(
    vDup,
    nDUp,
    dVenc
  ) {
    this.nDUp = nDUp;
    this.dVenc = dVenc;
    this.vDup = vDup;
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

  toJson() {
    return {
      nDUp: this.nDUp,
      dVenc: this.dVenc,
      vDup: this.vDup,
    };
  }
}