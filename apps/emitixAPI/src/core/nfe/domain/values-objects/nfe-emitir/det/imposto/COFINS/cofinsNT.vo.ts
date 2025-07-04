import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class COFINSNT {
  public readonly CST;

  constructor(data: { CST: string }) {
    this.CST = data.CST;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    const allowedCST = ['04', '05', '06', '07', '08', '09'];
    if (typeof this.CST !== 'string' || !allowedCST.includes(this.CST)) {
      throw new DomainError(`
        Código de Situação Tributária do COFINS (CST) é obrigatório e deve ser um dos seguintes:
        04 - Operação Tributável - Tributação Monofásica - (Alíquota Zero);
        05 - Operação Tributável (ST);
        06 - Operação Tributável - Alíquota Zero;
        07 - Operação Isenta da contribuição;
        08 - Operação Sem Incidência da Contribuição;
        09 - Operação com suspensão da contribuição.
      `);
    }
  }

  public equals(other) {
    if (!(other instanceof COFINSNT)) {
      return false;
    }
    return this.CST === other.CST;
  }

  public toJSON() {
    return {
      CST: this.CST,
    };
  }
}