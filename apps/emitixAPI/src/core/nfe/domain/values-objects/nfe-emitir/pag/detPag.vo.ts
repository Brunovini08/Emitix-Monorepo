import { DomainError } from "../../../errors/domain.error"
import type { card } from "./card.vo"

export class detPag {
  indPag?: string | undefined
  tPag
  xPag?: string | undefined
  vPag
  card?: card | undefined
  constructor(
    data: {
      tPag: string,
      vPag: string,
      indPag?: string | undefined,
      xPag?: string | undefined,
      card?: card | undefined
    }
  ) {
    this.indPag = data.indPag;
    this.tPag = data.tPag;
    this.xPag = data.xPag;
    this.vPag = data.vPag;
    this.card = data.card;
  }

  validateOrThrow() {
    const validIndPag = ['0', '1'];
    if (this.indPag !== undefined && this.indPag !== null && !validIndPag.includes(this.indPag)) {
      throw new DomainError(`O campo indPag deve ser um dos seguintes: ${validIndPag.join(', ')}.`);
    }

    if (this.tPag === undefined || this.tPag === null) {
      throw new DomainError('O campo tPag é obrigatório');
    }
    const tPagRegex = /^[0-9]{2}$/;
    if (!tPagRegex.test(this.tPag)) {
      throw new DomainError('O campo tPag deve ser um número de 2 dígitos.');
    }

    if (this.xPag !== undefined && this.xPag !== null) {
      if (this.xPag.length < 2 || this.xPag.length > 60) {
        throw new DomainError('O campo xPag deve ter entre 2 e 60 caracteres.');
      }
    }

    // Manual validation for vPag based on tPag
    if (this.tPag !== '90') {
      if (this.vPag === undefined || this.vPag === null) {
        throw new DomainError('O campo vPag é obrigatório quando tPag não for 90.');
      }
    }

    if (this.card !== undefined && this.card !== null) {
      if (typeof this.card.validateOrThrow === 'function') {
        this.card.validateOrThrow();
      }
    }
  }

  toJSON() {
    return {
      indPag: this.indPag,
      tPag: this.tPag,
      xPag: this.xPag,
      vPag: this.vPag,
      card: this.card ? this.card.toJson() : undefined,
    };
  }
}