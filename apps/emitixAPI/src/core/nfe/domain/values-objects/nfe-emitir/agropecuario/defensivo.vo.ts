import { DomainError } from "../../../errors/domain.error";

export class defensivo {

  nReceituario: string
  CPFRespTec: string

  constructor(
    data: {
      nReceituario: string,
      CPFRespTec: string
    }
  ) {
    this.nReceituario = data.nReceituario;
    this.CPFRespTec = data.CPFRespTec;
  }

  validateOrThrow() {
    const requiredFields = ['nReceituario', 'CPFRespTec'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new DomainError(`O campo ${field} é obrigatório`);
      }
    }

    if (this.nReceituario.length < 1 || this.nReceituario.length > 30) {
      throw new DomainError('O campo nReceituario deve ter entre 1 e 30 caracteres.');
    }
  }

  toJSON() {
    return {
      nReceituario: this.nReceituario,
      CPFRespTec: this.CPFRespTec,
    };
  }
}