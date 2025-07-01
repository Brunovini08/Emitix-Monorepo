export class Adi {
  public readonly nAdicao?: string
  public readonly nSeqAdic?: string
  public readonly cFabricante: string
  public readonly vDescDI?: number
  public readonly nDraw?: string

  constructor(data:{
    nAdicao?: string
    nSeqAdic?: string
    cFabricante: string
    vDescDI?: number
    nDraw?: string
  }) {
    this.nAdicao = data.nAdicao
    this.nSeqAdic = data.nSeqAdic
    this.cFabricante = data.cFabricante
    this.vDescDI = data.vDescDI
    this.nDraw = data.nDraw
  }

  public equals(other: Adi): boolean {
    if(!(other instanceof Adi)) {
      return false
    }
    return(
      this.nAdicao === other.nAdicao &&
      this.nSeqAdic === other.nSeqAdic &&
      this.cFabricante === other.cFabricante &&
      this.vDescDI === other.vDescDI &&
      this.nDraw === other.nDraw
    )
  }

  public toJson() {
    return {
      nAdicao: this.nAdicao,
      nSeqAdic: this.nSeqAdic,
      cFabricante: this.cFabricante,
      vDescDI: this.vDescDI,
      tDescDI: this.nDraw,
    }
  }
}