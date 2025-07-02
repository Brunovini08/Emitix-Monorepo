import { DomainError } from "../../errors/domain.error";

export class infIntermed {

  CNPJ: string
  idCadIntTran: string

  constructor(
    data: {
      CNPJ: string,
      idCadIntTran: string
    }
  ) {
    this.CNPJ = data.CNPJ;
    this.idCadIntTran = data.idCadIntTran;
  }

  validateOrThrow() {
    const requiredFields = ['CNPJ', 'idCadIntTran'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new DomainError(`O campo ${field} é obrigatório`);
      }
    }

    if (this.idCadIntTran !== undefined && this.idCadIntTran !== null) {
      if (this.idCadIntTran.length < 2 || this.idCadIntTran.length > 60) {
        throw new DomainError('O campo idCadIntTran deve ter entre 2 e 60 caracteres.');
      }
    }
  }

  toJSON() {
    return {
      CNPJ: this.CNPJ,
      idCadIntTran: this.idCadIntTran,
    };
  }
}