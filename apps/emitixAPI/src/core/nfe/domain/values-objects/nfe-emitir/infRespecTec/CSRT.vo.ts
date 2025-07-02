import { DomainError } from "../../../errors/domain.error";

export class CSRT {

  idCSRT
  hashCSRT

  constructor(
    data: {
      idCSRT: string,
      hashCSRT: string
    }
  ) {
    this.idCSRT = data.idCSRT;
    this.hashCSRT = data.hashCSRT;
  }

  validateOrThrow() {
    const requiredFields = ['idCSRT', 'hashCSRT'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new DomainError(`O campo ${field} é obrigatório`);
      }
    }

    const idCSRTRegex = /^[0-9]{2}$/;
    if (!idCSRTRegex.test(this.idCSRT)) {
      throw new DomainError('O campo idCSRT deve ser exatamente 2 dígitos.');
    }

    if (this.hashCSRT.length !== 20) {
      throw new DomainError('O campo hashCSRT deve ter exatamente 20 caracteres.');
    }
  }

  toJSON() {
    return {
      idCSRT: this.idCSRT,
      hashCSRT: this.hashCSRT,
    };
  }
}