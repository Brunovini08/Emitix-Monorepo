import type { fat } from "./fat.vo";
import type { dup } from "./dup.vo";

export class cobr {

  fat: fat[]
  dup: dup[]

  constructor(
    fat,
    dup
  ) {
    this.fat = fat;
    this.dup = dup;
  }

  validateOrThrow() {
    if (this.fat !== undefined && this.fat !== null) {
      for (const item of this.fat) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }

    if (this.dup !== undefined && this.dup !== null) {
      if (!Array.isArray(this.dup)) {
        throw new Error('O campo dup deve ser um array.');
      }
      if (this.dup.length < 0 || this.dup.length > 120) {
        throw new Error('O campo dup deve ter entre 0 e 120 itens.');
      }
      for (const item of this.dup) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }
  }

  toJson() {
    return {
      fat: this.fat.map(item => item.toJson()),
      dup: this.dup.map(item => item.toJson()),
    };
  }
}