export class exporta {

  UFSaidaPais: string
  xLocExporta: string
  xLocDespacho: string

  constructor(
    data: {
      UFSaidaPais: string,
      xLocExporta: string,
      xLocDespacho: string
    }
    ) {
    this.UFSaidaPais = data.UFSaidaPais;
    this.xLocExporta = data.xLocExporta;
    this.xLocDespacho = data.xLocDespacho;
  }

  validateOrThrow() {
    const requiredFields = ['UFSaidaPais', 'xLocExporta'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }

    if (this.xLocExporta.length < 1 || this.xLocExporta.length > 60) {
      throw new Error('O campo xLocExporta deve ter entre 1 e 60 caracteres.');
    }

    if (this.xLocDespacho !== undefined && this.xLocDespacho !== null) {
      if (this.xLocDespacho.length < 1 || this.xLocDespacho.length > 60) {
        throw new Error('O campo xLocDespacho deve ter entre 1 e 60 caracteres.');
      }
    }
  }

  toJson() {
    return {
      UFSaidaPais: this.UFSaidaPais,
      xLocExporta: this.xLocExporta,
      xLocDespacho: this.xLocDespacho,
    };
  }
}