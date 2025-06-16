export class Arma {
  public readonly tpArma: string
  public readonly nSerie: string
  public readonly nCano: string
  public readonly descr: string

  constructor(data: {
    tpArma: string
    nSerie: string
    nCano: string
    descr: string
  }) {
    this.tpArma = data.tpArma
    this.nSerie = data.nSerie
    this.nCano = data.nCano
    this.descr = data.descr
  }

  public toJson() {
    return {
      tpArma: this.tpArma,
      nSerie: this.nSerie,
      nCano: this.nCano,
      descr: this.descr
    }
  }
}