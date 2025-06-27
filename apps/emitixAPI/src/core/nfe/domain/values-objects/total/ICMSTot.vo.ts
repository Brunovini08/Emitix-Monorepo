export class ICMSTot {
  vBC
  vICMS
  vICMSDeson
  vFCPUFDest
  vICMSUFDest
  vICMSUFRemet
  vFCP
  vBCST
  vST
  vFCPST
  vFCPSTRet
  qBCMono
  vICMSMono
  qBCMonoReten
  vICMSMonoReten
  qBCMonoRet
  vICMSMonoRet
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
  vTotTrib

  constructor(
    data: {
      vBC,
      vICMS,
      vICMSDeson,
      vFCPUFDest?,
      vICMSUFDest?,
      vICMSUFRemet?,
      vFCP,
      vBCST,
      vST,
      vFCPST,
      vFCPSTRet,
      qBCMono?,
      vICMSMono?,
      qBCMonoReten?,
      vICMSMonoReten?,
      qBCMonoRet?,
      vICMSMonoRet?,
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
      vTotTrib?
    }
  ) {
    // Ordem exata conforme o XSD
    this.vBC = data.vBC;
    this.vICMS = data.vICMS;
    this.vICMSDeson = data.vICMSDeson;
    this.vFCPUFDest = data.vFCPUFDest;
    this.vICMSUFDest = data.vICMSUFDest;
    this.vICMSUFRemet = data.vICMSUFRemet;
    this.vFCP = data.vFCP;
    this.vBCST = data.vBCST;
    this.vST = data.vST;
    this.vFCPST = data.vFCPST;
    this.vFCPSTRet = data.vFCPSTRet;
    this.qBCMono = data.qBCMono;
    this.vICMSMono = data.vICMSMono;
    this.qBCMonoReten = data.qBCMonoReten;
    this.vICMSMonoReten = data.vICMSMonoReten;
    this.qBCMonoRet = data.qBCMonoRet;
    this.vICMSMonoRet = data.vICMSMonoRet;
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
    
    // Calcular vNF automaticamente se não fornecido
    if (data.vNF === undefined || data.vNF === null) {
      this.vNF = this.calcularVNF(data);
    } else {
      this.vNF = data.vNF;
    }
    
    this.vTotTrib = data.vTotTrib;
  }

  private calcularVNF(data: any): number {
    // Fórmula: vProd - vDesc + vFrete + vSeg + vOutro + vII + vIPI - vIPIDevol + vICMS + vST + vFCP + vPIS + vCOFINS
    const vProd = data.vProd || 0;
    const vDesc = data.vDesc || 0;
    const vFrete = data.vFrete || 0;
    const vSeg = data.vSeg || 0;
    const vOutro = data.vOutro || 0;
    const vII = data.vII || 0;
    const vIPI = data.vIPI || 0;
    const vIPIDevol = data.vIPIDevol || 0;
    const vICMS = data.vICMS || 0;
    const vST = data.vST || 0;
    const vFCP = data.vFCP || 0;
    const vPIS = data.vPIS || 0;
    const vCOFINS = data.vCOFINS || 0;

    return vProd - vDesc + vFrete + vSeg + vOutro + vII + vIPI - vIPIDevol + vICMS + vST + vFCP + vPIS + vCOFINS;
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

  // Função auxiliar para formatar valores decimais apenas se for número
  private formatDecimal(value: any, decimals: number = 2): any {
    if (value === undefined || value === null) {
      return value; // Mantém undefined/null como está
    }
    if (typeof value === 'number') {
      // Garantir que sempre tenha 2 casas decimais
      return value.toFixed(decimals);
    }
    return value; // Se não for número, retorna como está
  }

  toJson() {
    const result: any = {};
    
    // Elementos obrigatórios na ordem exata do XSD
    result.vBC = this.formatDecimal(this.vBC, 2);
    result.vICMS = this.formatDecimal(this.vICMS, 2);
    result.vICMSDeson = this.formatDecimal(this.vICMSDeson, 2);
    
    // Elementos opcionais de UF Destino (devem vir antes de vFCP)
    if (this.vFCPUFDest !== undefined && this.vFCPUFDest !== null) {
      result.vFCPUFDest = this.formatDecimal(this.vFCPUFDest, 2);
    }
    if (this.vICMSUFDest !== undefined && this.vICMSUFDest !== null) {
      result.vICMSUFDest = this.formatDecimal(this.vICMSUFDest, 2);
    }
    if (this.vICMSUFRemet !== undefined && this.vICMSUFRemet !== null) {
      result.vICMSUFRemet = this.formatDecimal(this.vICMSUFRemet, 2);
    }
    
    // Elementos obrigatórios restantes
    result.vFCP = this.formatDecimal(this.vFCP, 2);
    result.vBCST = this.formatDecimal(this.vBCST, 2);
    result.vST = this.formatDecimal(this.vST, 2);
    result.vFCPST = this.formatDecimal(this.vFCPST, 2);
    result.vFCPSTRet = this.formatDecimal(this.vFCPSTRet, 2);
    
    // Elementos opcionais de ICMS Monofásico
    if (this.qBCMono !== undefined && this.qBCMono !== null) {
      result.qBCMono = this.formatDecimal(this.qBCMono, 4);
    }
    if (this.vICMSMono !== undefined && this.vICMSMono !== null) {
      result.vICMSMono = this.formatDecimal(this.vICMSMono, 2);
    }
    if (this.qBCMonoReten !== undefined && this.qBCMonoReten !== null) {
      result.qBCMonoReten = this.formatDecimal(this.qBCMonoReten, 4);
    }
    if (this.vICMSMonoReten !== undefined && this.vICMSMonoReten !== null) {
      result.vICMSMonoReten = this.formatDecimal(this.vICMSMonoReten, 2);
    }
    if (this.qBCMonoRet !== undefined && this.qBCMonoRet !== null) {
      result.qBCMonoRet = this.formatDecimal(this.qBCMonoRet, 4);
    }
    if (this.vICMSMonoRet !== undefined && this.vICMSMonoRet !== null) {
      result.vICMSMonoRet = this.formatDecimal(this.vICMSMonoRet, 2);
    }
    
    // Elementos obrigatórios restantes
    result.vProd = this.formatDecimal(this.vProd, 2);
    result.vFrete = this.formatDecimal(this.vFrete, 2);
    result.vSeg = this.formatDecimal(this.vSeg, 2);
    result.vDesc = this.formatDecimal(this.vDesc, 2);
    result.vII = this.formatDecimal(this.vII, 2);
    result.vIPI = this.formatDecimal(this.vIPI, 2);
    result.vIPIDevol = this.formatDecimal(this.vIPIDevol, 2);
    result.vPIS = this.formatDecimal(this.vPIS, 2);
    result.vCOFINS = this.formatDecimal(this.vCOFINS, 2);
    result.vOutro = this.formatDecimal(this.vOutro, 2);
    result.vNF = this.formatDecimal(this.vNF, 2);
    
    // Elemento opcional final
    if (this.vTotTrib !== undefined && this.vTotTrib !== null) {
      result.vTotTrib = this.formatDecimal(this.vTotTrib, 2);
    }
    
    return result;
  }
}