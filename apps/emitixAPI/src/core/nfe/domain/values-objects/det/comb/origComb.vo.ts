export class OrigComb {
  public readonly indImport: string
  public readonly cUFOrig: string
  public readonly pOrig: number

  constructor(data: {
    indImport: string
    cUFOrig: string
    pOrig: number
  }) {}

  public toJson() {
    return {
      indImport: this.indImport,
      cUFOrig: this.cUFOrig,
      pOrig: this.pOrig
    }
  }
}