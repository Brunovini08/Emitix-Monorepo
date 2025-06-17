export class guiaTransito {

  tpGuia
  UFGuia
  serieGuia
  nGuia

  constructor(
    tpGuia,
    UFGuia,
    serieGuia,
    nGuia
  ) {
    this.tpGuia = tpGuia;
    this.UFGuia = UFGuia;
    this.serieGuia = serieGuia;
    this.nGuia = nGuia;
  }

  validateOrThrow() {
    const validTpGuia = ['1', '2', '3', '4', '5', '6', '7'];
    if (this.tpGuia === undefined || this.tpGuia === null || !validTpGuia.includes(this.tpGuia)) {
      throw new Error(`O campo tpGuia deve ser um dos seguintes valores: ${validTpGuia.join(', ')}.`);
    }

    const requiredFields = ['UFGuia', 'nGuia'];
    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }

    if (this.serieGuia !== undefined && this.serieGuia !== null) {
      if (this.serieGuia.length < 1 || this.serieGuia.length > 9) {
        throw new Error('O campo serieGuia deve ter entre 1 e 9 caracteres.');
      }
    }

    const nGuiaRegex = /^[0-9]{1,9}$/;
    if (!nGuiaRegex.test(this.nGuia)) {
      throw new Error('O campo nGuia deve ser um número com 1 a 9 dígitos.');
    }
  }

  toJSON() {
    return {
      tpGuia: this.tpGuia,
      UFGuia: this.UFGuia,
      serieGuia: this.serieGuia,
      nGuia: this.nGuia,
    };
  }
}