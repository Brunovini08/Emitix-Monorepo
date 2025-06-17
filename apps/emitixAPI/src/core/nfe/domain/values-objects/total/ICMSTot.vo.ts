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
  ) {
    this.vBC = vBC;
    this.vICMS = vICMS;
    this.vICMSDeson = vICMSDeson;
    this.vFCP = vFCP;
    this.vBCST = vBCST;
    this.vST = vST;
    this.vFCPST = vFCPST;
    this.vFCPSTRet = vFCPSTRet;
    this.vProd = vProd;
    this.vFrete = vFrete;
    this.vSeg = vSeg;
    this.vDesc = vDesc;
    this.vII = vII;
    this.vIPI = vIPI;
    this.vIPIDevol = vIPIDevol;
    this.vPIS = vPIS;
    this.vCOFINS = vCOFINS;
    this.vOutro = vOutro;
    this.vNF = vNF;
    this.vFCPUFDest = vFCPUFDest;
    this.vICMSUFDest = vICMSUFDest;
    this.vICMSUFRemet = vICMSUFRemet;
    this.qBCMono = qBCMono;
    this.vICMSMono = vICMSMono;
    this.qBCMonoReten = qBCMonoReten;
    this.vICMSMonoReten = vICMSMonoReten;
    this.qBCMonoRet = qBCMonoRet;
    this.vICMSMonoRet = vICMSMonoRet;
    this.vTotTrib = vTotTrib;
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