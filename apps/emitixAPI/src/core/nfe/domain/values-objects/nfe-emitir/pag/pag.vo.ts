import type { detPag } from "./detPag.vo";

export class pag {

  detPag: detPag[];
  vTroco: string | undefined;

  constructor(
    data: {
      detPag: detPag[],
      vTroco: string | undefined
    }
  ) {
    this.detPag = data.detPag;
    this.vTroco = data.vTroco;
  }

  validateOrThrow() {
    if (this.detPag === undefined || this.detPag === null) {
      throw new Error('O campo detPag é obrigatório');
    }
    if (!Array.isArray(this.detPag)) {
      throw new Error('O campo detPag deve ser um array.');
    }
    if (this.detPag.length > 100) {
      throw new Error('O campo detPag deve ter no máximo 100 itens.');
    }
    for (const item of this.detPag) {
      if (typeof item.validateOrThrow === 'function') {
        item.validateOrThrow();
      }
    }
  }

  toJSON() {
    return {
      detPag: this.detPag.map(item => item.toJSON()),
      vTroco: this.vTroco || undefined,
    };
  }
}