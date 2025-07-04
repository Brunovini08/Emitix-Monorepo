import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class IBSCBS {
  public readonly vDed: number;
  public readonly vFor: number;
  public readonly vTotDed: number;
  public readonly vLiqFor: number;

  constructor(data: {
    vDed: number;
    vFor: number;
    vTotDed: number;
    vLiqFor: number;
  }) {
    this.vDed = data.vDed;
    this.vFor = data.vFor;
    this.vTotDed = data.vTotDed;
    this.vLiqFor = data.vLiqFor;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (typeof this.vDed !== 'number' || this.vDed < 0) {
      throw new DomainError('Valor da dedução (vDed) deve ser um número não negativo.');
    }

    if (typeof this.vFor !== 'number' || this.vFor < 0) {
      throw new DomainError('Valor dos fornecimentos (vFor) deve ser um número não negativo.');
    }

    if (typeof this.vTotDed !== 'number' || this.vTotDed < 0) {
      throw new DomainError('Valor total das deduções (vTotDed) deve ser um número não negativo.');
    }

    if (typeof this.vLiqFor !== 'number' || this.vLiqFor < 0) {
      throw new DomainError('Valor líquido dos fornecimentos (vLiqFor) deve ser um número não negativo.');
    }
  }

  public equals(other: IBSCBS): boolean {
    if (!(other instanceof IBSCBS)) {
      return false;
    }
    return (
      this.vDed === other.vDed &&
      this.vFor === other.vFor &&
      this.vTotDed === other.vTotDed &&
      this.vLiqFor === other.vLiqFor
    );
  }

  public toJSON() {
    return {
      vDed: this.vDed,
      vFor: this.vFor,
      vTotDed: this.vTotDed,
      vLiqFor: this.vLiqFor,
    };
  }
} 