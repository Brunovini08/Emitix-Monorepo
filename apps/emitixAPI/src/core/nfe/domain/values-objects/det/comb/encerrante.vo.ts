export class Encerrante {
  public readonly nBico: string
  public readonly nBomba?: string
  public readonly nTanque?: string
  public readonly vEncIni: number
  public readonly vEncFin: number

  constructor(data: {
    nBico: string
    nBomba?: string
    nTanque?: string
    vEncIni: number
    vEncFin: number
  }) {}

  public toJson() {
    return {
      nBico: this.nBico,
      nBomba: this.nBomba,
      nTanque: this.nTanque,
      vEncIni: this.vEncIni,
      vEncFin: this.vEncFin
    }
  }
}