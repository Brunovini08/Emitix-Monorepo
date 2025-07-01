export class procRef {

  nProc: string
  indProc: string
  tpAto: string

  constructor(
   data: {
    nProc: string,
    indProc: string,
    tpAto: string
   }
  ) {
    this.nProc = data.nProc;
    this.indProc = data.indProc;
    this.tpAto = data.tpAto;
  }

  validateOrThrow() {
    if (this.nProc === undefined || this.nProc === null) {
      throw new Error('O campo nProc é obrigatório');
    }
    if (this.nProc.length < 1 || this.nProc.length > 60) {
      throw new Error('O campo nProc deve ter entre 1 e 60 caracteres.');
    }

    const validIndProc = ['0', '1', '2', '3', '4', '9'];
    if (this.indProc === undefined || this.indProc === null || !validIndProc.includes(this.indProc)) {
      throw new Error(`O campo indProc deve ser um dos seguintes: ${validIndProc.join(', ')}.`);
    }

    const validTpOto = ['08', '10', '12', '14', '15'];
    if (this.tpAto !== undefined && this.tpAto !== null && !validTpOto.includes(this.tpAto)) {
      throw new Error(`O campo tpAto deve ser um dos seguintes: ${validTpOto.join(', ')}.`);
    }
  }

  toJSON() {
    return {
      nProc: this.nProc,
      indProc: this.indProc,
      tpAto: this.tpAto,
    };
  }
}