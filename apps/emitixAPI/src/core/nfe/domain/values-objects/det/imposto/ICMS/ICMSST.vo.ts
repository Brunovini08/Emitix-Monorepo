export class ICMSST {
  orig;
  CST;
  vBCSTRet;
  pST;
  vICMSSubstituto;
  vICMSSTRet;
  vBCFCPSTRet;
  pFCPSTRet;
  vFCPSTRet;

  constructor(data: {
    orig: string,
    CST: string,
    vBCSTRet: string,
    pST: string,
    vICMSSubstituto: string,
    vICMSSTRet: string,
    vBCFCPSTRet: string,
    pFCPSTRet: string,
    vFCPSTRet: string,
  }) {
    this.orig = data.orig;
    this.CST = data.CST;
    this.vBCSTRet = data.vBCSTRet;
    this.pST = data.pST;
    this.vICMSSubstituto = data.vICMSSubstituto;
    this.vICMSSTRet = data.vICMSSTRet;
    this.vBCFCPSTRet = data.vBCFCPSTRet;
    this.pFCPSTRet = data.pFCPSTRet;
    this.vFCPSTRet = data.vFCPSTRet;
  }

  public toJSON() {
    return {
      ICMSST: {
        orig: this.orig,
        CST: this.CST,
        vBCSTRet: this.vBCSTRet,
        pST: this.pST,
        vICMSSubstituto: this.vICMSSubstituto,
        vICMSSTRet: this.vICMSSTRet,
        vBCFCPSTRet: this.vBCFCPSTRet,
        pFCPSTRet: this.pFCPSTRet,
        vFCPSTRet: this.vFCPSTRet,
      }
    };
  }
}