export class TLocalVO {
  xLgr
  nro
  xBairro
  cMun
  xMun
  UF
  xCpl
  constructor(
    data: {
      xLgr: string;
      nro: string;
      xBairro: string;
      cMun: string;
      xMun: string;
      UF: string;
      xCpl?: string;
    }
  ) {
    this.xLgr = data.xLgr;
    this.nro = data.nro;
    this.xCpl = data.xCpl;
    this.xBairro = data.xBairro;
    this.cMun = data.cMun;
    this.xMun = data.xMun;
    this.UF = data.UF;
  }

  validateOrThrow() {
    const requiredFields = ['xLgr', 'nro', 'xBairro', 'cMun', 'xMun', 'UF'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null || this[field] === '') {
        throw new Error(`Valor não informado: ${field}`);
      }
    }

    if (this.cMun.length !== 7 || !/^\d+$/.test(this.cMun)) {
      throw new Error('Código do município deve ter 7 dígitos e ser numérico.');
    }

    if (this.UF === undefined || this.UF === null) {
      throw new Error('UF é obrigatório.');
    }
  }

  toJSON() {
    return {
      entrega: {
        xLgr: this.xLgr,
        nro: this.nro,
        xCpl: this.xCpl,
        xBairro: this.xBairro,
        cMun: this.cMun,
        xMun: this.xMun,
        UF: this.UF,
      }
    };
  }
}