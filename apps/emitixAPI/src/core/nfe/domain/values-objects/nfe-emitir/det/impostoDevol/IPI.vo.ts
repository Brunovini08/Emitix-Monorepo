export class IPI {
  public vIPIDevol

  constructor(data) {
    this.vIPIDevol = data.vIPIDevol
  }

  public validateOrThrow() {
    if (typeof this.vIPIDevol !== 'number' || this.vIPIDevol < 0) {
      throw new Error('Valor do IPI Devol (vIPIDevol) deve ser um número não negativo.')
    }
  }

  public equals(other) {
    if (!(other instanceof IPI)) {
      return false;
    }
    return this.vIPIDevol === other.vIPIDevol
  }

  public toJSON() {
    return {
      vIPIDevol: this.vIPIDevol,
    }
  }
}
