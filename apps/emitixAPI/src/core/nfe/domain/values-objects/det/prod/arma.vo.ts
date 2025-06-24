export class Arma {
  public readonly nSerie: string
  public readonly nCano: string
  public readonly descr: string

  constructor(data: {

    nSerie: string
    nCano: string
    descr: string
  }) {
    this.nSerie = data.nSerie
    this.nCano = data.nCano
    this.descr = data.descr
  }

  public toJson() {
    return {
      nSerie: this.nSerie,
      nCano: this.nCano,
      descr: this.descr
    }
  }
}