export class InfProdEmb {
  public readonly xEmb: string
  public readonly qVolEmb: number
  public readonly uEmb: string

  constructor(data: {
    xEmb: string
    qVolEmb: number
    uEmb: string
  }) {
    this.xEmb = data.xEmb
    this.qVolEmb = data.qVolEmb
    this.uEmb = data.uEmb
  }

  public toJson() {
    return {
      xEmb: this.xEmb,
      qVolEmb: this.qVolEmb,
      uEmb: this.uEmb
    }
  }
}