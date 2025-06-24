export class Endereco {
  public readonly xLgr: string;
  public readonly nro: string;
  public readonly xBairro: string;
  public readonly cMun: string;
  public readonly xMun: string;
  public readonly UF: string;
  public readonly CEP: string;
  public readonly cPais: string;
  public readonly xPais: string;
  public readonly fone?: string;
  public readonly cpl?: string;

  constructor(data: {
    xLgr: string;
    nro: string;
    xBairro: string;
    cMun: string;
    xMun: string;
    UF: string;
    CEP: string;
    cPais: string;
    xPais: string;
    fone?: string;
    cpl?: string;
  }) {
    this.xLgr = data.xLgr;
    this.nro = data.nro;
    this.xBairro = data.xBairro;
    this.cMun = data.cMun;
    this.xMun = data.xMun;
    this.UF = data.UF;
    this.CEP = data.CEP;
    this.cPais = data.cPais;
    this.xPais = data.xPais;
    this.fone = data.fone;
    this.cpl = data.cpl;

    this.validateOrThrow();
  }

  public validateOrThrow(): void {
    if (!this.xLgr || this.xLgr.trim() === '') {
      throw new Error('Logradouro (xLgr) é obrigatório.');
    }
    if (!this.nro || this.nro.trim() === '') {
      throw new Error('Número (nro) é obrigatório.');
    }
    if (!this.xBairro || this.xBairro.trim() === '') {
      throw new Error('Bairro (xBairro) é obrigatório.');
    }
    if (!this.cMun || this.cMun.length !== 7) {
      throw new Error('Código do Município (cMun) inválido. Deve ter 7 dígitos.');
    }
    if (!this.xMun || this.xMun.trim() === '') {
      throw new Error('Nome do Município (xMun) é obrigatório.');
    }
    if (!this.UF || this.UF.length !== 2) {
      throw new Error('UF inválida. Deve ter 2 caracteres.');
    }
    if (!this.CEP || this.CEP.length !== 8) {
      throw new Error('CEP inválido. Deve ter 8 dígitos.');
    }
  }

  public getCepFormatado(): string {
    if (!this.CEP) return '';
    return this.CEP.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  public getFullAddress(): string {
    return `${this.xLgr}, ${this.nro} - ${this.xBairro}, ${this.xMun} - ${this.UF}, CEP ${this.getCepFormatado()}`;
  }

  toJSON() {
    return {
        enderDest: {
        xLgr: this.xLgr,
        nro: this.nro,
        xBairro: this.xBairro,
        cMun: this.cMun,
        xMun: this.xMun,
        UF: this.UF,
        CEP: this.CEP,
        cPais: this.cPais,
        xPais: this.xPais,
        fone: this.fone,
        cpl: this.cpl,
      }
    }
  }
}