export class defensivo {

  nReceituario
  CPFRespTec

  constructor(
    nReceituario,
    CPFRespTec
  ) {
    this.nReceituario = nReceituario;
    this.CPFRespTec = CPFRespTec;
  }

  validateOrThrow() {
    const requiredFields = ['nReceituario', 'CPFRespTec'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }

    if (this.nReceituario.length < 1 || this.nReceituario.length > 30) {
      throw new Error('O campo nReceituario deve ter entre 1 e 30 caracteres.');
    }
  }

  toJSON() {
    return {
      nReceituario: this.nReceituario,
      CPFRespTec: this.CPFRespTec,
    };
  }
}