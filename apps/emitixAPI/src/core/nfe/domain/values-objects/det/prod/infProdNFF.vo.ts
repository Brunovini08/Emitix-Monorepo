export class InfProdNFF {
  public readonly cProdFisco: string
  public readonly cOperNFF: string

  constructor(data: {
    cProdFisco: string
    cOperNFF: string
  }) {
    this.cProdFisco = data.cProdFisco
    this.cOperNFF = data.cOperNFF
  }
  
  public toJson() {
    return {
      cProdFisco: this.cProdFisco,
      cOperNFF: this.cOperNFF
    }
  }
}