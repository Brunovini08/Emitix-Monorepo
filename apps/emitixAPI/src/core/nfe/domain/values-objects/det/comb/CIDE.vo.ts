export class CIDE {
  public readonly qBCProd: number
  public readonly vAliqProd: number
  public readonly vCIDE: number

  constructor(data: {
    qBCProd: number
    vAliqProd: number
    vCIDE: number
  }) {}

  public toJson() {
    return {
      qBCProd: this.qBCProd,
      vAliqProd: this.vAliqProd,
      vCIDE: this.vCIDE
    }
  }
}