import type { defensivo } from "./defensivo.vo";
import type { guiaTransito } from "./guiaTransito.vo";

export class agropecuario {

  defensivo: defensivo[]
  guiaTransito: guiaTransito

  constructor(
    defensivo,
    guiaTransito
  ) {
    this.defensivo = defensivo;
    this.guiaTransito = guiaTransito;
  }

  validateOrThrow() {
    if (
      (this.defensivo === undefined || this.defensivo === null) &&
      (this.guiaTransito === undefined || this.guiaTransito === null)
    ) {
      throw new Error('At least one of "defensivo" or "guiaTransito" must be provided.');
    }

    if (this.defensivo !== undefined && this.defensivo !== null) {
      if (!Array.isArray(this.defensivo)) {
        throw new Error('O campo defensivo deve ser um array.');
      }
      if (this.defensivo.length > 20) {
        throw new Error('O campo defensivo deve ter no máximo 20 itens.');
      }
      for (const item of this.defensivo) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }

    if (this.guiaTransito !== undefined && this.guiaTransito !== null) {
      if (typeof this.guiaTransito.validateOrThrow === 'function') {
        this.guiaTransito.validateOrThrow();
      }
    }
  }

  toJSON() {
    return {
      defensivo: this.defensivo.map(item => item.toJSON()),
      guiaTransito: this.guiaTransito.toJSON(),
    };
  }
}