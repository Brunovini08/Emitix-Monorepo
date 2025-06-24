export class card {

  tpIntegra
  CNPJ
  tBand
  cAut
  CNPJReceb
  idTErmPag

  constructor(
    tpIntegra,
    CNPJ,
    tBand,
    cAut,
    CNPJReceb,
    idTErmPag
  ) {
    this.tpIntegra = tpIntegra;
    this.CNPJ = CNPJ;
    this.tBand = tBand;
    this.cAut = cAut;
    this.CNPJReceb = CNPJReceb;
    this.idTErmPag = idTErmPag;
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

    if (this.idTErmPag !== undefined && this.idTErmPag !== null) {
      if (this.idTErmPag.length < 1 || this.idTErmPag.length > 40) {
        throw new Error('O campo idTErmPag deve ter entre 1 e 40 caracteres.');
      }
    }
  }

  toJson() {
    return {
      tpIntegra: this.tpIntegra,
      CNPJ: this.CNPJ,
      tBand: this.tBand,
      cAut: this.cAut,
      CNPJReceb: this.CNPJReceb,
      idTErmPag: this.idTErmPag,
    };
  }
}