export class detPag {

  indPag
  tPag
  xPag
  vPag
  dPag
  infoPag
  card
  constructor(
    tPag,
    vPag,
    indPag,
    xPag,
    dPag,
    infoPag,
    card
  ) {
    this.indPag = indPag;
    this.tPag = tPag;
    this.xPag = xPag;
    this.vPag = vPag;
    this.dPag = dPag;
    this.infoPag = infoPag;
    this.card = card;
  }

  validateOrThrow() {
    const validIndPag = ['0', '1'];
    if (this.indPag !== undefined && this.indPag !== null && !validIndPag.includes(this.indPag)) {
      throw new Error(`O campo indPag deve ser um dos seguintes: ${validIndPag.join(', ')}.`);
    }

    if (this.tPag === undefined || this.tPag === null) {
      throw new Error('O campo tPag é obrigatório');
    }
    const tPagRegex = /^[0-9]{2}$/;
    if (!tPagRegex.test(this.tPag)) {
      throw new Error('O campo tPag deve ser um número de 2 dígitos.');
    }

    if (this.xPag !== undefined && this.xPag !== null) {
      if (this.xPag.length < 2 || this.xPag.length > 60) {
        throw new Error('O campo xPag deve ter entre 2 e 60 caracteres.');
      }
    }

    // Manual validation for vPag based on tPag
    if (this.tPag !== '90') {
      if (this.vPag === undefined || this.vPag === null) {
        throw new Error('O campo vPag é obrigatório quando tPag não for 90.');
      }
    }

    if (this.infoPag !== undefined && this.infoPag !== null) {
      if (typeof this.infoPag.validateOrThrow === 'function') {
        this.infoPag.validateOrThrow();
      }
    }

    if (this.card !== undefined && this.card !== null) {
      if (typeof this.card.validateOrThrow === 'function') {
        this.card.validateOrThrow();
      }
    }
  }

  toJson() {
    return {
      indPag: this.indPag,
      tPag: this.tPag,
      xPag: this.xPag,
      vPag: this.vPag,
      dPag: this.dPag,
      infoPag: this.infoPag ? (typeof this.infoPag.toJson === 'function' ? this.infoPag.toJson() : this.infoPag) : undefined,
      card: this.card ? (typeof this.card.toJson === 'function' ? this.card.toJson() : this.card) : undefined,
    };
  }
}