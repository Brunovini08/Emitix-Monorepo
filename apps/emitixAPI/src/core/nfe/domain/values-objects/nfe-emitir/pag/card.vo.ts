export class card {

  tpIntegra
  CNPJ?: string | undefined
  tBand?: string | undefined
  cAut?: string | undefined

  constructor(
    data: {
      tpIntegra,
      CNPJ,
      tBand,
      cAut,
    }
  ) {
    this.tpIntegra = data.tpIntegra;
    this.CNPJ = data.CNPJ ? String(data.CNPJ) : undefined;
    this.tBand = data.tBand ? String(data.tBand) : undefined;
    this.cAut = data.cAut ? String(data.cAut) : undefined;

    this.validateOrThrow();
  }

  validateOrThrow() {
    const validTpIntegra = ['1', '2'];
    if (this.tpIntegra === undefined || this.tpIntegra === null || !validTpIntegra.includes(this.tpIntegra)) {
      throw new Error(`O campo tpIntegra deve ser um dos seguintes: ${validTpIntegra.join(', ')}.`);
    }

    if (this.tBand !== undefined && this.tBand !== null) {
      const tBandRegex = /^[0-9]{2}$/;
      if (!tBandRegex.test(this.tBand)) {
        throw new Error('O campo tBand deve ser um número de 2 dígitos.');
      }
    }

    if (this.cAut !== undefined && this.cAut !== null) {
      if (this.cAut.length < 1 || this.cAut.length > 128) {
        throw new Error('O campo cAut deve ter entre 1 e 128 caracteres.');
      }
    }
  }

  toJson() {
    return {
      tpIntegra: this.tpIntegra,
      CNPJ: this.CNPJ,
      tBand: this.tBand,
      cAut: this.cAut,
    };
  }
}