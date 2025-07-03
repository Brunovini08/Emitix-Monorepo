export class InfCons {
  xServ: string;
  UF: string;
  IE?: string;
  CNPJ?: string | undefined;
  CPF?: string | undefined;

  constructor(data: {
    xServ: string;
    UF: string;
    IE?: string | undefined;
    CNPJ?: string | undefined;
    CPF?: string | undefined;
  }) {
    this.xServ = data.xServ;
    this.UF = data.UF;
    this.IE = data.IE;
    this.CNPJ = data.CNPJ
    this.CPF = data.CPF

    this.validateOrThrow();
  }

  private validateOrThrow(): void {
    if (!this.xServ) {
      throw new Error("xServ é obrigatório");
    }
    if(this.xServ !== "CONS-CAD") {
      throw new Error("xServ deve ser 'CONS-CAD'");
    }
    if (!this.UF) {
      throw new Error("UF é obrigatório");
    }
    if (!this.IE &&!this.CNPJ &&!this.CPF) {
      throw new Error("IE, CNPJ ou CPF deve ser informado");
    }
    if (this.IE && this.CNPJ) {
      throw new Error("IE e CNPJ não podem ser informados ao mesmo tempo");
    }
    if (this.IE && this.CPF) {
      throw new Error("IE e CPF não podem ser informados ao mesmo tempo");
    }
    if (this.CNPJ && this.CPF) {
      throw new Error("CNPJ e CPF não podem ser informados ao mesmo tempo");
    }
    if (this.CNPJ && this.CNPJ.length !== 14) {
      throw new Error("CNPJ inválido");
    }
    if (this.CPF && this.CPF.length!== 11) {
      throw new Error("CPF inválido");
    }
    if (this.IE && this.IE.length!== 14) {
      throw new Error("IE inválida");
    }
  }

  public toJSON() {
    return {
      infCons: {
        xServ: this.xServ,
        UF: this.UF,
        IE: this.IE || undefined,
        CNPJ: this.CNPJ || undefined,
        CPF: this.CPF || undefined,
      }
    };
  }
}