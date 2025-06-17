export class retTransp {

  vServ
  vBCRet
  pICMSRet
  vICMSRet
  CFOP
  cMunFG

  constructor(
    vServ,
    vBCRet,
    pICMSRet,
    vICMSRet,
    CFOP,
    cMunFG
  ) {
    this.vServ = vServ;
    this.vBCRet = vBCRet;
    this.pICMSRet = pICMSRet;
    this.vICMSRet = vICMSRet;
    this.CFOP = CFOP;
    this.cMunFG = cMunFG;
  }

  validateOrThrow() {
    const requiredFields = [
      'vServ',
      'vBCRet',
      'pICMSRet',
      'vICMSRet',
      'CFOP',
      'cMunFG',
    ];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }

    if (this.CFOP !== undefined && this.CFOP !== null) {
      const cfopRegex = /^[1-7]{1}[0-9]{3}$/;
      if (!cfopRegex.test(this.CFOP)) {
        throw new Error('O campo CFOP deve ser um número de 4 dígitos começando com 1-7.');
      }
    }
  }

  toJson() {
    return {
      vServ: this.vServ,
      vBCRet: this.vBCRet,
      pICMSRet: this.pICMSRet,
      vICMSRet: this.vICMSRet,
      CFOP: this.CFOP,
      cMunFG: this.cMunFG,
    };
  }
}