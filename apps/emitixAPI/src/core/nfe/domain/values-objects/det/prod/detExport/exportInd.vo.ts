export class ExportInd {
  public readonly nRE: string
  public readonly chNFe: string
  public readonly qExport: number

  constructor(data: {
    nRE: string
    chNFe: string
    qExport: number
  }) {
    this.nRE = data.nRE
    this.chNFe = data.chNFe
    this.qExport = data.qExport
  }

  public toJson() {
    return {
      nRE: this.nRE,
      chNFe: this.chNFe,
      qExport: this.qExport
    }
  }
}