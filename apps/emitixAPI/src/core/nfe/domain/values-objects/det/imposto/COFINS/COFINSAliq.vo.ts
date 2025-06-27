export class COFINSAliq {
  CST: string;
  vBC: number;
  pCOFINS: number;
  vCOFINS: number;

  constructor(data: { CST: string; vBC: number; pCOFINS: number; vCOFINS: number }) {
    this.CST = data.CST;
    this.vBC = data.vBC;
    this.pCOFINS = data.pCOFINS;
    this.vCOFINS = data.vCOFINS;
  }
  public toJSON() {
    return {
      COFINSAliq: {
        CST: this.CST,
        vBC: this.vBC.toFixed(2),
        pCOFINS: this.pCOFINS.toFixed(2),
        vCOFINS: this.vCOFINS.toFixed(2), // Garantir 2 casas decimais
      }
    };
  } 
}