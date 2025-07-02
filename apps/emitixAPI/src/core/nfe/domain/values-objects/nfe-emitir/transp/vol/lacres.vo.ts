import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class lacres {

  nLacre

  constructor(
    data: {
      nLacre
    }
  ) {
    this.nLacre = data.nLacre;
  }

  validateOrThrow() {
    if (this.nLacre === undefined || this.nLacre === null) {
      throw new DomainError('O campo nLacre é obrigatório');
    }

    if (this.nLacre.length < 1 || this.nLacre.length > 60) {
      throw new DomainError('O campo nLacre deve ter entre 1 e 60 caracteres.');
    }
  }

  toJSON() {
    return {
      nLacre: this.nLacre,
    };
  }
}