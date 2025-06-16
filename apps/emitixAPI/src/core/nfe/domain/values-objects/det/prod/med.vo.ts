export class Med {
  public readonly cProdANVISA: string
  public readonly xMotivoIsencao?: string
  public readonly vPMC: number

  constructor(data: {
    cProdANVISA: string
    xMotivoIsencao?: string
    vPMC: number
  }) {
    this.cProdANVISA = data.cProdANVISA
    this.xMotivoIsencao = data.xMotivoIsencao
    this.vPMC = data.vPMC
  }

  public toJson() {
    return {
      cProdANVISA: this.cProdANVISA,
      xMotivoIsencao: this.xMotivoIsencao,
      vPMC: this.vPMC
    }
  }
}