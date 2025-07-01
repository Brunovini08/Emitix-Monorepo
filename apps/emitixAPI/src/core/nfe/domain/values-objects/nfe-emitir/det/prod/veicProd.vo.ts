export class VeicProd {
  public readonly tpOp: string
  public readonly chassi: string
  public readonly cCor: string
  public readonly xCor: string
  public readonly pot: number
  public readonly cilin: string
  public readonly pesoL: string
  public readonly pesoB: string
  public readonly nSerie: string
  public readonly tpComb: string
  public readonly nMotor: string
  public readonly CMT: string
  public readonly dist: string
  public readonly anoMod: string
  public readonly anoFab: string
  public readonly tpPint: string
  public readonly tpVeic: string
  public readonly espVeic: string
  public readonly VIN: string
  public readonly condVeic: string
  public readonly cMod: string
  public readonly cCorDENATRAN: string
  public readonly lota: string
  public readonly tpRest: string

  constructor(data: {
    tpOp: string
    chassi: string
    cCor: string
    xCor: string
    pot: number
    cilin: string
    pesoL: string
    pesoB: string
    nSerie: string
    tpComb: string
    nMotor: string
    CMT: string
    dist: string
    anoMod: string
    anoFab: string
    tpPint: string
    tpVeic: string
    espVeic: string
    VIN: string
    condVeic: string
    cMod: string
    cCorDENATRAN: string
    lota: string
    tpRest: string
  }) {
    
  }

  public toJson() {
    return {
      tpOp: this.tpOp,
      chassi: this.chassi,
      cCor: this.cCor,
      xCor: this.xCor,
      pot: this.pot,
      cilin: this.cilin,
      pesoL: this.pesoL,
      pesoB: this.pesoB,
      nSerie: this.nSerie,
      tpComb: this.tpComb,
      nMotor: this.nMotor,
      CMT: this.CMT,
      dist: this.dist,
      anoMod: this.anoMod,
      anoFab: this.anoFab,
      tpPint: this.tpPint,
      tpVeic: this.tpVeic,
      espVeic: this.espVeic,
      VIN: this.VIN,
      condVeic: this.condVeic,
      cMod: this.cMod,
      cCorDENATRAN: this.cCorDENATRAN,
      lota: this.lota,
      tpRest: this.tpRest
    }
  }
}