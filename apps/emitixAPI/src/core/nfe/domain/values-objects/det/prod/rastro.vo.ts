export class Rastro {
  public readonly nLote: string
  public readonly qLote: number
  public readonly dFab: Date
  public readonly dVal: Date
  public readonly cAgreg: string

  constructor(data: {
    nLote: string
    qLote: number
    dFab: Date
    dVal: Date
    cAgreg: string
  }) {}

  public toJson() {
    return {
      nLote: this.nLote,
      qLote: this.qLote,
      dFab: this.dFab,
      dVal: this.dVal,
      cAgreg: this.cAgreg
    }
  }
}