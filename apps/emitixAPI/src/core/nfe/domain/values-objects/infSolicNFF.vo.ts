export class infSolicNFF {

  xSolic: string

  constructor(
    data: {
      xSolic: string
    }
  ) {
    this.xSolic = data.xSolic;
  }

  validateOrThrow() {
    if (this.xSolic === undefined || this.xSolic === null) {
      throw new Error('O campo xSolic é obrigatório');
    }
    if (this.xSolic.length < 2 || this.xSolic.length > 5000) {
      throw new Error('O campo xSolic deve ter entre 2 e 5000 caracteres.');
    }
  }

  toJSON() {
    return {
      xSolic: this.xSolic,
    };
  }
}