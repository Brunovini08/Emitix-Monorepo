import type { ExportInd } from "./exportInd.vo"

export class DetExport {
  public readonly nDraw?: string
  public readonly exportInd?: ExportInd[]

  constructor(data: {
    nDraw?: string
    exportInd?: ExportInd[]
  }) {
    this.nDraw = data.nDraw
    this.exportInd = data.exportInd
  }
  
  public toJson() {
    return {
      nDraw: this.nDraw,
      exportInd: this.exportInd?.map(exportInd => exportInd.toJson())
    }
  }
}