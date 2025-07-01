import type { CIDE } from "./CIDE.vo"
import type { Encerrante } from "./encerrante.vo"
import type { OrigComb } from "./origComb.vo"

export class Comb {
  public readonly cProdANP: string
  public readonly descANP: string
  public readonly pGLP?: number
  public readonly pGNn?: number
  public readonly pGNi?: number
  public readonly vPart?: number
  public readonly CODIF?: string
  public readonly qTemp?: number
  public readonly UFCons: string
  public readonly CIDE?: CIDE
  public readonly encerrante?: Encerrante
  public readonly pBio?: number
  public readonly origComb?: OrigComb[]
  public readonly nRECOPI?: string

  constructor(data: {
    cProdANP: string
    descANP: string
    pGLP?: number
    pGNn?: number
    pGNi?: number
    vPart?: number
    CODIF?: string
    qTemp?: number
    UFCons: string
    CIDE?: CIDE
    encerrante?: Encerrante
    pBio?: number
    origComb?: OrigComb[]
    nRECOPI?: string

  }) {}

  public toJson() {
    return {
      cProdANP: this.cProdANP,
      descANP: this.descANP,
      pGLP: this.pGLP,
      pGNn: this.pGNn,
      pGNi: this.pGNi,
      vPart: this.vPart,
      CODIF: this.CODIF,
      qTemp: this.qTemp,
      UFCons: this.UFCons,
      CIDE: this.CIDE,
      encerrante: this.encerrante,
      pBio: this.pBio,
      origComb: this.origComb,
      nRECOPI: this.nRECOPI
    }
  }
}