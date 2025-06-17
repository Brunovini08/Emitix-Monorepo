export class ICMSTot {
  vBC
  vICMS
  vICMSDeson
  vFCP
  vBCST
  vST
  vFCPST
  vFCPSTRet
  vProd
  vFrete
  vSeg
  vDesc
  vII
  vIPI
  vIPIDevol
  vPIS
  vCOFINS
  vOutro
  vNF
  vFCPUFDest
  vICMSUFDest
  vICMSUFRemet
  qBCMono
  vICMSMono
  qBCMonoReten
  vICMSMonoReten
  qBCMonoRet
  vICMSMonoRet
  vTotTrib

  constructor(
    data: {
      vBC,
      vICMS,
      vICMSDeson,
      vFCP,
      vBCST,
      vST,
      vFCPST,
      vFCPSTRet,
      vProd,
      vFrete,
      vSeg,
      vDesc,
      vII,
      vIPI,
      vIPIDevol,
      vPIS,
      vCOFINS,
      vOutro,
      vNF,
      vFCPUFDest,
      vICMSUFDest,
      vICMSUFRemet,
      qBCMono,
      vICMSMono,
      qBCMonoReten,
      vICMSMonoReten,
      qBCMonoRet,
      vICMSMonoRet,
      vTotTrib
    }
  ) {
    this.vBC = data.vBC;
    this.vICMS = data.vICMS;
    this.vICMSDeson = data.vICMSDeson;
    this.vFCP = data.vFCP;
    this.vBCST = data.vBCST;
    this.vST = data.vST;
    this.vFCPST = data.vFCPST;
    this.vFCPSTRet = data.vFCPSTRet;
    this.vProd = data.vProd;
    this.vFrete = data.vFrete;
    this.vSeg = data.vSeg;
    this.vDesc = data.vDesc;
    this.vII = data.vII;
    this.vIPI = data.vIPI;
    this.vIPIDevol = data.vIPIDevol;
    this.vPIS = data.vPIS;
    this.vCOFINS = data.vCOFINS;
    this.vOutro = data.vOutro;
    this.vNF = data.vNF;
    this.vFCPUFDest = data.vFCPUFDest;
    this.vICMSUFDest = data.vICMSUFDest;
    this.vICMSUFRemet = data.vICMSUFRemet;
    this.qBCMono = data.qBCMono;
    this.vICMSMono = data.vICMSMono;
    this.qBCMonoReten = data.qBCMonoReten;
    this.vICMSMonoReten = data.vICMSMonoReten;
    this.qBCMonoRet = data.qBCMonoRet;
    this.vICMSMonoRet = data.vICMSMonoRet;
    this.vTotTrib = data.vTotTrib;
  }

  validateOrThrow() {
    const requiredFields = [
      'vBC', 'vICMS', 'vICMSDeson', 'vFCP', 'vBCST', 'vST',
      'vFCPST', 'vFCPSTRet', 'vProd', 'vFrete', 'vSeg', 'vDesc',
      'vII', 'vIPI', 'vIPIDevol', 'vPIS', 'vCOFINS', 'vOutro', 'vNF'
    ];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }
  }

  toJson() {
    return {
      vBC: this.vBC,
      vICMS: this.vICMS,
      vICMSDeson: this.vICMSDeson,
      vFCPUFDest: this.vFCPUFDest,
      vICMSUFDest: this.vICMSUFDest,
      vICMSUFRemet: this.vICMSUFRemet,
      vFCP: this.vFCP,
      vBCST: this.vBCST,
      vST: this.vST,
      vFCPST: this.vFCPST,
      vFCPSTRet: this.vFCPSTRet,
      qBCMono: this.qBCMono,
      vICMSMono: this.vICMSMono,
      qBCMonoReten: this.qBCMonoReten,
      vICMSMonoReten: this.vICMSMonoReten,
      qBCMonoRet: this.qBCMonoRet,
      vICMSMonoRet: this.vICMSMonoRet,
      vProd: this.vProd,
      vFrete: this.vFrete,
      vSeg: this.vSeg,
      vDesc: this.vDesc,
      vII: this.vII,
      vIPI: this.vIPI,
      vIPIDevol: this.vIPIDevol,
      vPIS: this.vPIS,
      vCOFINS: this.vCOFINS,
      vOutro: this.vOutro,
      vNF: this.vNF,
      vTotTrib: this.vTotTrib,
    };
  }
}