export class infoPag {

  CNPJPag
  UFPag

  constructor(
    CNPJPag,
    UFPag
  ) {
    this.CNPJPag = CNPJPag;
    this.UFPag = UFPag;
  }

  validateOrThrow() {
    const requiredFields = ['CNPJPag', 'UFPag'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }
  }

  toJson() {
    return {
      CNPJPag: this.CNPJPag,
      UFPag: this.UFPag,
    };
  }
}