import { DomainError } from "src/core/nfe/domain/errors/domain.error";

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
        throw new DomainError(`O campo ${field} é obrigatório`);
      }
    }

    if (this.xDed.length < 1 || this.xDed.length > 60) {
      throw new DomainError('O campo xDed deve ter entre 1 e 60 caracteres.');
    }
  }

  toJSON() {
    return {
      xDed: this.xDed,
      vDed: this.vDed,
    };
  }
}