import type { Quant } from "./quant.vo";
import type { BaseCalc } from "./baseCalc.vo";

export class PISST {
  public readonly baseCalc: BaseCalc;
  public readonly quant: Quant;
  public readonly vPIS: number;
  public readonly indSomaPISST: string;

  constructor(data) {
    this.baseCalc = data.baseCalc 
    this.quant = data.quant 
    this.vPIS = data.vPIS;
    this.indSomaPISST = data.indSomaPISST ?? null;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    const hasBaseCalc = this.baseCalc !== null;
    const hasQuant = this.quant !== null;

    if (!hasBaseCalc && !hasQuant) {
      throw new Error('Pelo menos um dos campos "baseCalc" ou "quant" deve ser fornecido.');
    }

    if (hasBaseCalc && hasQuant) {
      throw new Error('Apenas um dos campos "baseCalc" ou "quant" pode ser fornecido.');
    }

    if (this.baseCalc) {
      this.baseCalc.validateOrThrow();
    }

    if (this.quant) {
      this.quant.validateOrThrow();
    }

    if (typeof this.vPIS !== 'number' || this.vPIS < 0) {
      throw new Error('Valor do PIS ST (vPIS) é obrigatório e deve ser um número não negativo.');
    }

    const allowedIndSomaPISST = ['0', '1'];
    if (this.indSomaPISST !== null && (typeof this.indSomaPISST !== 'string' || !allowedIndSomaPISST.includes(this.indSomaPISST))) {
      throw new Error('O indicador de soma PIS ST (indSomaPISST) deve ser "0" ou "1", se informado.');
    }
  }

  public equals(other) {
    if (!(other instanceof PISST)) {
      return false;
    }
    return (
      (this.baseCalc ? this.baseCalc.equals(other.baseCalc) : this.baseCalc === other.baseCalc) &&
      (this.quant ? this.quant.equals(other.quant) : this.quant === other.quant) &&
      this.vPIS === other.vPIS &&
      this.indSomaPISST === other.indSomaPISST
    );
  }

  public toJSON() {
    return {
      baseCalc: this.baseCalc ? this.baseCalc.toJSON() : null,
      quant: this.quant ? this.quant.toJSON() : null,
      vPIS: this.vPIS,
      indSomaPISST: this.indSomaPISST,
    };
  }
}