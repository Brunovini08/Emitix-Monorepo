export class lacres {

  nLacre

  constructor(
    nLacre
  ) {
    this.nLacre = nLacre;
  }

  validateOrThrow() {
    if (this.nLacre === undefined || this.nLacre === null) {
      throw new Error('O campo nLacre é obrigatório');
    }

    if (this.nLacre.length < 1 || this.nLacre.length > 60) {
      throw new Error('O campo nLacre deve ter entre 1 e 60 caracteres.');
    }
  }

  toJson() {
    return {
      nLacre: this.nLacre,
    };
  }
}