import type { BaseCalc } from "./baseCalc.vo";
import type { Quant } from "./quant.vo";

export class COFINSST {
  public readonly baseCalc: BaseCalc;
  public readonly quant: Quant;
  public readonly vCOFINS: number;
  public readonly indSomaCOFINSST: string;

  constructor(data: { baseCalc: BaseCalc, quant: Quant, vCOFINS: number, indSomaCOFINSST: string }) {
    this.baseCalc = data.baseCalc 
    this.quant = data.quant 
    this.vCOFINS = data.vCOFINS;
    this.indSomaCOFINSST = data.indSomaCOFINSST ?? null;

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

    if (typeof this.vCOFINS !== 'number' || this.vCOFINS < 0) {
      throw new Error('Valor do COFINS ST (vCOFINS) é obrigatório e deve ser um número não negativo.');
    }

    const allowedIndSomaCOFINSST = ['0', '1'];
    if (this.indSomaCOFINSST !== null && (typeof this.indSomaCOFINSST !== 'string' || !allowedIndSomaCOFINSST.includes(this.indSomaCOFINSST))) {
      throw new Error('O indicador de soma COFINS ST (indSomaCOFINSST) deve ser "0" ou "1", se informado.');
    }
  }

  public equals(other) {
    if (!(other instanceof COFINSST)) {
      return false;
    }
    return (
      (this.baseCalc ? this.baseCalc.equals(other.baseCalc) : this.baseCalc === other.baseCalc) &&
      (this.quant ? this.quant.equals(other.quant) : this.quant === other.quant) &&
      this.vCOFINS === other.vCOFINS &&
      this.indSomaCOFINSST === other.indSomaCOFINSST
    );
  }

  public toJSON() {
    return {
      baseCalc: this.baseCalc ? this.baseCalc.toJSON() : null,
      quant: this.quant ? this.quant.toJSON() : null,
      vCOFINS: this.vCOFINS.toFixed(2),
      indSomaCOFINSST: this.indSomaCOFINSST,
    };
  }
}