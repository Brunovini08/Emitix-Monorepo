import { DomainError } from "../../../errors/domain.error";
import { defensivo } from "./defensivo.vo";
import { guiaTransito } from "./guiaTransito.vo";

export class agropecuario {

  defensivo: defensivo[]
  guiaTransito: guiaTransito

  constructor(
    data: {
      defensivo: defensivo[],
      guiaTransito: guiaTransito
    }
  ) {
    this.defensivo = data.defensivo;
    this.guiaTransito = data.guiaTransito;
  }

  validateOrThrow() {
    if (
      (this.defensivo === undefined || this.defensivo === null) &&
      (this.guiaTransito === undefined || this.guiaTransito === null)
    ) {
      throw new DomainError('At least one of "defensivo" or "guiaTransito" must be provided.');
    }

    if (this.defensivo !== undefined && this.defensivo !== null) {
      if (!Array.isArray(this.defensivo)) {
        throw new DomainError('O campo defensivo deve ser um array.');
      }
      if (this.defensivo.length > 20) {
        throw new DomainError('O campo defensivo deve ter no máximo 20 itens.');
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