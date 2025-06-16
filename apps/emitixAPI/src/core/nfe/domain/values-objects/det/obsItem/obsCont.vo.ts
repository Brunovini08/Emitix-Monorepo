export class ObsContent {
  public readonly xTexto;
  public readonly xCampo;

  constructor(data) {
    this.xTexto = data.xTexto; // Assuming TString is just a string
    this.xCampo = data.xCampo; // Assuming TString is just a string

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (typeof this.xTexto !== 'string' || this.xTexto.length < 1 || this.xTexto.length > 60) {
      throw new Error('O campo xTexto é obrigatório e deve ter entre 1 e 60 caracteres.');
    }

    if (typeof this.xCampo !== 'string' || this.xCampo.length < 1 || this.xCampo.length > 20) {
      throw new Error('O campo xCampo é obrigatório e deve ter entre 1 e 20 caracteres.');
    }
  }

  public equals(other) {
    if (!(other instanceof ObsContent)) {
      return false;
    }
    return (
      this.xTexto === other.xTexto &&
      this.xCampo === other.xCampo
    );
  }

  public toJSON() {
    return {
      xTexto: this.xTexto,
      xCampo: this.xCampo,
    };
  }
}