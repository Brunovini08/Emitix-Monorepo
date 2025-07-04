import type { fat } from "./fat.vo";
import type { dup } from "./dup.vo";
import { DomainError } from "../../../errors/domain.error";

export class cobr {

  fat?: fat
  dup?: dup[]

  constructor(
    data: {
      fat?: fat,
      dup?: dup[]
    }
  ) {
    this.fat = data.fat || undefined;
    this.dup = data.dup || [];
  }

  validateOrThrow() {
    if (this.fat !== undefined && this.fat !== null) {
      if (typeof this.fat.validateOrThrow === 'function') {
        this.fat.validateOrThrow();
      }
    }

    if (this.dup !== undefined && this.dup !== null) {
      if (!Array.isArray(this.dup)) {
        throw new DomainError('O campo dup deve ser um array.');
      }
      if (this.dup.length < 0 || this.dup.length > 120) {
        throw new DomainError('O campo dup deve ter entre 0 e 120 itens.');
      }
      for (const item of this.dup) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }
  }

  toJSON() {
    return {
      fat: this.fat?.toJSON() || undefined,
      dup: this.dup?.map(item => item.toJSON()) || [],
    };
  }
}