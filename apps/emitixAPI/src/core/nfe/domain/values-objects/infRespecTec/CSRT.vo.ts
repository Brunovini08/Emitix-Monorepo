export class CSRT {

  idCSRT
  hashCSRT

  constructor(
    idCSRT,
    hashCSRT
  ) {
    this.idCSRT = idCSRT;
    this.hashCSRT = hashCSRT;
  }

  validateOrThrow() {
    const requiredFields = ['idCSRT', 'hashCSRT'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }

    const idCSRTRegex = /^[0-9]{2}$/;
    if (!idCSRTRegex.test(this.idCSRT)) {
      throw new Error('O campo idCSRT deve ser exatamente 2 dígitos.');
    }

    if (this.hashCSRT.length !== 20) {
      throw new Error('O campo hashCSRT deve ter exatamente 20 caracteres.');
    }
  }

  toJSON() {
    return {
      idCSRT: this.idCSRT,
      hashCSRT: this.hashCSRT,
    };
  }
}