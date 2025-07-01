export class InfCons {
  xServ: string;
  UF: string;
  IE: string;
  CNPJ?: string | undefined;
  CPF?: string | undefined;

  constructor(data: {
    xServ: string;
    UF: string;
    IE: string;
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
    if (!this.IE) {
      throw new Error("IE é obrigatório");
    }
    if (!this.CNPJ && !this.CPF) {
      throw new Error("CNPJ ou CPF deve ser informado");
    }
  }

  public toJSON() {
    return {
      infCons: {
        xServ: this.xServ,
        UF: this.UF,
        IE: this.IE,
        CNPJ: this.CNPJ || undefined,
        CPF: this.CPF || undefined,
      }
    };
  }
}