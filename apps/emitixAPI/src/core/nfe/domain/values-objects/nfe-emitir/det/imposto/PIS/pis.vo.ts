
import { DomainError } from "src/core/nfe/domain/errors/domain.error";
import type { PISAliq } from "./pisAliq.vo";
import type { PISNT } from "./pisNT.vo";
import type { PISOutr } from "./pisOutr.vo";
import type { PISQtde } from "./pisQtde.vo";

export class PIS {
  public readonly PISAliq?: PISAliq;
  public readonly PISQtde?: PISQtde;
  public readonly PISNT?: PISNT;
  public readonly PISOutr?: PISOutr;

  constructor(data: {
    PISAliq?: PISAliq
    PISQtde?: PISQtde
    PISNT?: PISNT
    PISOutr?: PISOutr
  }) {
    this.PISAliq = data.PISAliq || undefined
    this.PISQtde = data.PISQtde || undefined
    this.PISNT = data.PISNT || undefined
    this.PISOutr = data.PISOutr || undefined

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    const definedCount = [
      this.PISAliq,
      this.PISQtde,
      this.PISNT,
      this.PISOutr,
    ].filter(Boolean).length;

    if (definedCount === 0) {
      throw new DomainError('Pelo menos um dos tipos de PIS (PISAliq, PISQtde, PISNT, PISOutr) deve ser informado.');
    }

    if (definedCount > 1) {
      throw new DomainError('Apenas um dos tipos de PIS (PISAliq, PISQtde, PISNT, PISOutr) pode ser informado.');
    }

    if (this.PISAliq) {
      this.PISAliq.validateOrThrow();
    }

    if (this.PISQtde) {
      this.PISQtde.validateOrThrow();
    }

    if (this.PISNT) {
      this.PISNT.validateOrThrow();
    }

    if (this.PISOutr) {
      this.PISOutr.validateOrThrow();
    }
  }

  public equals(other) {
    if (!(other instanceof PIS)) {
      return false;
    }
    return (
      (this.PISAliq ? this.PISAliq.equals(other.PISAliq) : this.PISAliq === other.PISAliq) &&
      (this.PISQtde ? this.PISQtde.equals(other.PISQtde) : this.PISQtde === other.PISQtde) &&
      (this.PISNT ? this.PISNT.equals(other.PISNT) : this.PISNT === other.PISNT) &&
      (this.PISOutr ? this.PISOutr.equals(other.PISOutr) : this.PISOutr === other.PISOutr)
    );
  }

  public toJSON() {
    return {
      PISAliq: this.PISAliq ? this.PISAliq.toJSON() : undefined,
      PISQtde: this.PISQtde ? this.PISQtde.toJSON() : undefined,
      PISNT: this.PISNT ? this.PISNT.toJSON() : undefined,
      PISOutr: this.PISOutr ? this.PISOutr.toJSON() : undefined,
    };
  }
}