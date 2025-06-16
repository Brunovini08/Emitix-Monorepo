import type { IPI } from "./IPI.vo"

export class ImpostoDevol {
  public readonly pDevol
  public readonly IPI: IPI
  
  
  constructor(data) {
    this.pDevol = data.pDevol
    this.IPI = data.IPI
  }

  public validateOrThrow() {
    if (typeof this.pDevol !== 'number' || this.pDevol < 0) {
      throw new Error('Percentual de Devolução (pDevol) deve ser um número não negativo.')
    }
  }

  public equals(other) {
    if (!(other instanceof ImpostoDevol)) {
      return false;
    }
    return this.pDevol === other.pDevol && this.IPI.equals(other.IPI)
  }

  public toJSON() {
    return {
      pDevol: this.pDevol,
      IPI: this.IPI.toJSON(),
    }
  }
}