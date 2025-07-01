export class retTrib {

  vRetPIS?
  vRetCOFINS?
  vRetCSLL?
  vBCIRRF?
  vIRRF?
  vBCRetPrev?
  vRetPrev?

  constructor(
    data: {
      vRetPIS?,
      vRetCOFINS?,
      vRetCSLL?,
      vBCIRRF?,
      vIRRF?,
      vBCRetPrev?,
      vRetPrev?
    }
  ) {
    this.vRetPIS = data.vRetPIS || undefined;
    this.vRetCOFINS = data.vRetCOFINS || undefined;
    this.vRetCSLL = data.vRetCSLL || undefined;
    this.vBCIRRF = data.vBCIRRF || undefined;
    this.vIRRF = data.vIRRF || undefined;
    this.vBCRetPrev = data.vBCRetPrev || undefined;
    this.vRetPrev = data.vRetPrev || undefined;
  }

  validateOrThrow() {
    // Todos os campos são opcionais, não há validação obrigatória
  }

  toJSON() {
    return {
      vRetPIS: this.vRetPIS,
      vRetCOFINS: this.vRetCOFINS,
      vRetCSLL: this.vRetCSLL,
      vBCIRRF: this.vBCIRRF,
      vIRRF: this.vIRRF,
      vBCRetPrev: this.vBCRetPrev,
      vRetPrev: this.vRetPrev,
    };
  }
}