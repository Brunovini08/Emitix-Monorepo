export class ISSQNTot {
  vServ
  vBC
  vISS
  vPIS
  vCOFINS
  dCompet
  vDeducao
  vOutro
  vDescIncond
  vDescCond
  vISSRet
  retTrib

  constructor(
    dCompet,
    vServ = undefined,
    vBC = undefined,
    vISS = undefined,
    vPIS = undefined,
    vCOFINS = undefined,
    vDeducao = undefined,
    vOutro = undefined,
    vDescIncond = undefined,
    vDescCond = undefined,
    vISSRet = undefined,
    retTrib = undefined
  ) {
    this.vServ = vServ;
    this.vBC = vBC;
    this.vISS = vISS;
    this.vPIS = vPIS;
    this.vCOFINS = vCOFINS;
    this.dCompet = dCompet;
    this.vDeducao = vDeducao;
    this.vOutro = vOutro;
    this.vDescIncond = vDescIncond;
    this.vDescCond = vDescCond;
    this.vISSRet = vISSRet;
    this.retTrib = retTrib;
  }

  validateOrThrow() {
    const requiredFields = ['dCompet'];
    const retTribOptions = ['1', '2', '3', '4', '5', '6'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }

    if (this.retTrib !== undefined && this.retTrib !== null && !retTribOptions.includes(this.retTrib)) {
      throw new Error(`O valor de retTrib deve ser um dos seguintes: ${retTribOptions.join(', ')}.`);
    }
  }

  toJson() {
    return {
      vServ: this.vServ,
      vBC: this.vBC,
      vISS: this.vISS,
      vPIS: this.vPIS,
      vCOFINS: this.vCOFINS,
      dCompet: this.dCompet,
      vDeducao: this.vDeducao,
      vOutro: this.vOutro,
      vDescIncond: this.vDescIncond,
      vDescCond: this.vDescCond,
      vISSRet: this.vISSRet,
      retTrib: this.retTrib,
    };
  }
}