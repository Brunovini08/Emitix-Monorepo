export class veiculoComReboque {

  veicTransp
  reboque

  constructor(
    veicTransp,
    reboque
  ) {
    this.veicTransp = veicTransp;
    this.reboque = reboque;
  }

  validateOrThrow() {
    if (this.veicTransp !== undefined && this.veicTransp !== null) {
      if (typeof this.veicTransp.validateOrThrow === 'function') {
        this.veicTransp.validateOrThrow();
      }
    }

    if (this.reboque !== undefined && this.reboque !== null) {
      if (!Array.isArray(this.reboque)) {
        throw new Error('O campo reboque deve ser um array.');
      }
      if (this.reboque.length < 0 || this.reboque.length > 5) {
        throw new Error('O campo reboque deve ter entre 0 e 5 itens.');
      }
      for (const item of this.reboque) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }
  }

  toJson() {
    return {
      veicTransp: this.veicTransp.toJson(),
      reboque: this.reboque.map(item => item.toJson()),
    };
  }
}