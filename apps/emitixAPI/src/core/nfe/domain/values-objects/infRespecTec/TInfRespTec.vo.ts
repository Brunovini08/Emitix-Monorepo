import type { CSRT } from "./CSRT.vo";

export class TInfRespTec {

  CNPJ
  xContato
  email
  fone
  CSRT: CSRT

  constructor(
    CNPJ,
    xContato,
    email,
    fone,
    CSRT
  ) {
    this.CNPJ = CNPJ;
    this.xContato = xContato;
    this.email = email;
    this.fone = fone;
    this.CSRT = CSRT;
  }

  validateOrThrow() {
    const requiredFields = ['CNPJ', 'xContato', 'email', 'fone'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }

    if (this.xContato.length < 2 || this.xContato.length > 60) {
      throw new Error('Invalid length for xContato. Must be between 2 and 60 characters.');
    }

    if (this.email.length < 6 || this.email.length > 60) {
      throw new Error('Invalid length for email. Must be between 6 and 60 characters.');
    }

    const foneRegex = /^[0-9]{6,14}$/;
    if (!foneRegex.test(this.fone)) {
      throw new Error('Invalid fone format. Must be 6 to 14 digits.');
    }

    if (this.CSRT !== undefined && this.CSRT !== null) {
      if (typeof this.CSRT.validateOrThrow === 'function') {
        this.CSRT.validateOrThrow();
      }
    }
  }

  toJSON() {
    return {
      CNPJ: this.CNPJ,
      xContato: this.xContato,
      email: this.email,
      fone: this.fone,
      CSRT: this.CSRT.toJSON()
    };
  }
}