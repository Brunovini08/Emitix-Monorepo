export class deduc {

  xDed
  vDed

  constructor(
    data: {
      xDed: string,
      vDed: number,
    }
  ) {
    this.xDed = data.xDed;
    this.vDed = data.vDed;
  }

  validateOrThrow() {
    const requiredFields = ['xDed', 'vDed'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }

    if (this.xDed.length < 1 || this.xDed.length > 60) {
      throw new Error('O campo xDed deve ter entre 1 e 60 caracteres.');
    }
  }

  toJSON() {
    return {
      xDed: this.xDed,
      vDed: this.vDed,
    };
  }
}