export class TVeiculo {
  placa;
  UF;
  RNTC;

  constructor(data: {
    placa,
    UF,
    RNTC
  }) {
    this.placa = data.placa;
    this.UF = data.UF; // Assuming TUf is also a pure class or just a string/object
    this.RNTC = data.RNTC; // Assuming TString is also a pure class or just a string
  }

  validateOrThrow() {
    if (!this.placa) {
      throw new Error('Placa do veículo é obrigatória.');
    }

    const placaRegex = /^[A-Z]{2,4}\d{3,4}$|^[A-Z0-9]{7}$/;
    if (!placaRegex.test(this.placa)) {
      throw new Error('Formato de placa inválido.');
    }

    if (this.RNTC && (this.RNTC.length < 1 || this.RNTC.length > 20)) {
      throw new Error('RNTC deve ter entre 1 e 20 caracteres.');
    }
  }

  toJson() {
    return {
      placa: this.placa,
      UF: this.UF,
      RNTC: this.RNTC
    }
  }
}