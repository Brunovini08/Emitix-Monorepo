export class transporta {

  CNPJ
  CPF
  xNome
  IE
  xEnder
  xMun
  UF

  constructor(
    data: {
      CNPJ,
      CPF,
      xNome,
      IE,
      xEnder,
      xMun,
      UF
    }
  ) {
    this.CNPJ = data.CNPJ;
    this.CPF = data.CPF;
    this.xNome = data.xNome;
    this.IE = data.IE;
    this.xEnder = data.xEnder;
    this.xMun = data.xMun;
    this.UF = data.UF;
  }

  validateOrThrow() {
    if (this.xNome !== undefined && this.xNome !== null) {
      if (this.xNome.length < 0 || this.xNome.length > 60) {
        throw new Error('O campo xNome deve ter entre 0 e 60 caracteres.');
      }
    }

    if (this.xEnder !== undefined && this.xEnder !== null) {
      if (this.xEnder.length < 0 || this.xEnder.length > 60) {
        throw new Error('O campo xEnder deve ter entre 0 e 60 caracteres.');
      }
    }

    if (this.xMun !== undefined && this.xMun !== null) {
      if (this.xMun.length < 0 || this.xMun.length > 60) {
        throw new Error('O campo xMun deve ter entre 0 e 60 caracteres.');
      }
    }
  }

  toJson() {
    return {
      CNPJ: this.CNPJ,
      CPF: this.CPF,
      xNome: this.xNome,
      IE: this.IE,
      xEnder: this.xEnder,
      xMun: this.xMun,
      UF: this.UF,
    };
  }
}