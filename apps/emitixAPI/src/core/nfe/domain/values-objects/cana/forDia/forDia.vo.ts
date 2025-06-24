import type { deduc } from "./deduc.vo";

export class forDia {

  qtde
  dia
  deduc: deduc[]

  constructor(
    data: {
      qtde: number,
      dia: number,
    }
  ) {
    this.qtde = data.qtde;
    this.dia = data.dia;
  }

  validateOrThrow() {
    const requiredFields = ['qtde', 'dia'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }

    if (this.dia !== undefined && this.dia !== null) {
      const diaRegex = /^[1-9]|[1][0-9]|[2][0-9]|[3][0-1]$/;
      if (!diaRegex.test(this.dia)) {
        throw new Error('O campo dia deve ser um número entre 1 e 31.');
      }
    }

    if (this.qtde !== undefined && this.qtde !== null) {
      if (typeof this.qtde.validateOrThrow === 'function') {
        this.qtde.validateOrThrow();
      }
    }
  }

  toJSON() {
    return {
      qtde: this.qtde,
      dia: this.dia,
      deduc: this.deduc.map(item => item.toJSON()),
    };
  }
}