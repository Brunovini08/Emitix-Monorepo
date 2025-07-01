import type { BaseCalc } from "./baseCalc.vo";
import type { Quant } from "./quant.vo";

export class COFINSST {
  public readonly baseCalc?: BaseCalc;
  public readonly quant?: Quant;
  public readonly vCOFINS: number;
  public readonly indSomaCOFINSST?: string;

  constructor(data: { baseCalc?: BaseCalc, quant?: Quant, vCOFINS: number, indSomaCOFINSST?: string }) {
    this.baseCalc = data.baseCalc;
    this.quant = data.quant;
    this.vCOFINS = data.vCOFINS;
    this.indSomaCOFINSST = data.indSomaCOFINSST;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (this.baseCalc && this.quant) {
      throw new Error('COFINSST deve conter apenas baseCalc OU quant, não ambos.');
    }

    if (!this.baseCalc && !this.quant) {
      throw new Error('COFINSST deve conter baseCalc OU quant.');
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

    if (this.indSomaCOFINSST !== undefined && !['0', '1'].includes(this.indSomaCOFINSST)) {
      throw new Error('Indicador de soma do COFINS ST (indSomaCOFINSST) deve ser "0" ou "1", se informado.');
    }
  }

  public equals(other: COFINSST): boolean {
    if (!(other instanceof COFINSST)) {
      return false;
    }
    return (
      (this.baseCalc ? this.baseCalc.equals(other.baseCalc) : false) &&
      (this.quant ? this.quant.equals(other.quant) : false) &&
      this.vCOFINS === other.vCOFINS &&
      this.indSomaCOFINSST === other.indSomaCOFINSST
    );
  }

  public toJSON() {
    return {
      baseCalc: this.baseCalc ? this.baseCalc.toJSON() : undefined,
      quant: this.quant ? this.quant.toJSON() : undefined,
      vCOFINS: this.vCOFINS.toFixed(2),
      indSomaCOFINSST: this.indSomaCOFINSST,
    };
  }
}