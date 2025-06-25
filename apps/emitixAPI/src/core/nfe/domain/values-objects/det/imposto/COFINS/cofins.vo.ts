import type { COFINSAliq } from "./cofinsAliq.vo";
import type { COFINSNT } from "./cofinsNT.vo";
import type { COFINSOutr } from "./cofinsOutr/cofinsOutr.vo";
import type { COFINSQtde } from "./cofinsQtde.vo";

export class COFINS {
  public readonly COFINSAliq?: COFINSAliq;
  public readonly COFINSQtde?: COFINSQtde;
  public readonly COFINSNT?: COFINSNT;
  public readonly COFINSOutr?: COFINSOutr;

  constructor(data: { COFINSAliq?: COFINSAliq, COFINSQtde?: COFINSQtde, COFINSNT?: COFINSNT, COFINSOutr?: COFINSOutr }) {
    this.COFINSAliq = data.COFINSAliq || undefined
    this.COFINSQtde = data.COFINSQtde || undefined
    this.COFINSNT = data.COFINSNT || undefined
    this.COFINSOutr = data.COFINSOutr || undefined

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    const definedCount = [
      this.COFINSAliq,
      this.COFINSQtde,
      this.COFINSNT,
      this.COFINSOutr,
    ].filter(Boolean).length;

    if (definedCount === 0) {
      throw new Error('Pelo menos um dos tipos de COFINS (COFINSAliq, COFINSQtde, COFINSNT, COFINSOutr) deve ser informado.');
    }

    if (definedCount > 1) {
      throw new Error('Apenas um dos tipos de COFINS (COFINSAliq, COFINSQtde, COFINSNT, COFINSOutr) pode ser informado.');
    }

    if (this.COFINSAliq) {
      this.COFINSAliq.validateOrThrow();
    }

    if (this.COFINSQtde) {
      this.COFINSQtde.validateOrThrow();
    }

    if (this.COFINSNT) {
      this.COFINSNT.validateOrThrow();
    }

    if (this.COFINSOutr) {
      this.COFINSOutr.validateOrThrow();
    }
  }

  public equals(other) {
    if (!(other instanceof COFINS)) {
      return false;
    }
    return (
      (this.COFINSAliq ? this.COFINSAliq.equals(other.COFINSAliq) : this.COFINSAliq === other.COFINSAliq) &&
      (this.COFINSQtde ? this.COFINSQtde.equals(other.COFINSQtde) : this.COFINSQtde === other.COFINSQtde) &&
      (this.COFINSNT ? this.COFINSNT.equals(other.COFINSNT) : this.COFINSNT === other.COFINSNT) &&
      (this.COFINSOutr ? this.COFINSOutr.equals(other.COFINSOutr) : this.COFINSOutr === other.COFINSOutr)
    );
  }

  public toJSON() {
    return {
      COFINSAliq: this.COFINSAliq ? this.COFINSAliq.toJSON() : undefined,
      COFINSQtde: this.COFINSQtde ? this.COFINSQtde.toJSON() : undefined,
      COFINSNT: this.COFINSNT ? this.COFINSNT.toJSON() : undefined,
      COFINSOutr: this.COFINSOutr ? this.COFINSOutr.toJSON() : undefined,
    };
  }
}