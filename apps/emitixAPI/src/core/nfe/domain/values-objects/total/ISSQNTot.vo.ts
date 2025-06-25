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
  cRegrib

  constructor(
    data: {
      vServ?,
      vBC?,
      vISS?,
      vPIS?,
      vCOFINS?,
      dCompet,
      vDeducao?,
      vOutro?,
      vDescIncond?,
      vDescCond?,
      vISSRet?,
      cRegrib?,
    }
  ) {
    this.vServ = data.vServ || undefined;
    this.vBC = data.vBC || undefined;
    this.vISS = data.vISS || undefined;
    this.vPIS = data.vPIS || undefined;
    this.vCOFINS = data.vCOFINS || undefined;
    this.dCompet = data.dCompet;
    this.vDeducao = data.vDeducao || undefined;
    this.vOutro = data.vOutro || undefined;
    this.vDescIncond = data.vDescIncond || undefined;
    this.vDescCond = data.vDescCond || undefined;
    this.vISSRet = data.vISSRet || undefined;
    this.cRegrib = data.cRegrib || undefined;
  }

  validateOrThrow() {
    const requiredFields = ['dCompet'];
    const cRegribOptions = ['1', '2', '3', '4', '5', '6'];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }

    if (this.cRegrib !== undefined && this.cRegrib !== null && !cRegribOptions.includes(this.cRegrib)) {
      throw new Error(`O valor de cRegrib deve ser um dos seguintes: ${cRegribOptions.join(', ')}.`);
    }
  }

  toJSON() {
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
      cRegrib: this.cRegrib,
    };
  }
}