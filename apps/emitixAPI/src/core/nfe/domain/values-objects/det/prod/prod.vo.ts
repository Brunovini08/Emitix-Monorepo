// src/domain/nfe/value-objects/nfe-item-prod.vo.ts

import type { Arma } from "./arma.vo";
import type { DetExport } from "./detExport/detExport.vo";
import type { DI } from "./DI/DI.vo";
import type { GCred } from "./gcred.vo";
import type { InfProdEmb } from "./infProdEmb.vo";
import type { InfProdNFF } from "./infProdNFF.vo";
import type { Med } from "./med.vo";
import type { Rastro } from "./rastro.vo";
import type { VeicProd } from "./veicProd.vo";

export class Prod {
  public readonly cProd: string;
  public readonly cEAN: string;
  public readonly cBarra?: string;
  public readonly xProd: string;
  public readonly NCM: string;
  public readonly NVE?: string;
  public readonly CEST?: string;
  public readonly indEscala?: string;
  public readonly CNPJFab?: string;
  public readonly cBenef?: string;
  public readonly gCred?: GCred[]; 
  public readonly EXTIPI?: string;
  public readonly CFOP: string;
  public readonly uCom: string;
  public readonly qCom: number;
  public readonly vUnCom: number;
  public readonly vProd: number;
  public readonly cEANTrib: string;
  public readonly cBarraTrib?: string;
  public readonly uTrib?: string;
  public readonly qTrib?: number; 
  public readonly vUnTrib?: number; 
  public readonly vFrete?: number;
  public readonly vSeg?: number;
  public readonly vDesc?: number;
  public readonly vOutro?: number;
  public readonly indTot?: string;
  public readonly DI?: DI
  public readonly detExport?: DetExport[]
  public readonly xPed?: string;
  public readonly nItemPed?: string;
  public readonly nFCI?: string;
  public readonly rastro?: Rastro[]; 
  public readonly infProdNFF?: InfProdNFF; 
  public readonly infProdEmb?: InfProdEmb; 
  public readonly veicProd?: VeicProd; 
  public readonly med?: Med; 
  public readonly arma?: Arma[]; 
  public readonly comb?: any; // Substitua 'any' pelo VO Comb
  public readonly nRECOPI?: string;

  constructor(data: {
    cProd: string; cEAN: string; cBarra?: string; xProd: string; NCM: string;
    NVE?: string; CEST?: string; indEscala?: string; CNPJFab?: string; cBenef?: string;
    gCred?: GCred[]; EXTIPI?: string; CFOP: string; uCom: string; qCom: number;
    vUnCom: number; vProd: number; cEANTrib: string; cBarraTrib?: string; uTrib?: string;
    qTrib?: number; vUnTrib?: number; vFrete?: number; vSeg?: number; vDesc?: number;
    vOutro?: number; indTot?: string; detExport?: DetExport[]; xPed?: string; nItemPed?: string;
    nFCI?: string; rastro?: Rastro[]; infProdNFF?: InfProdNFF; infProdEmb?: InfProdEmb; veicProd?: VeicProd;
    med?: Med; arma?: Arma[]; comb?: any; nRECOPI?: string;
  }) {
    this.cProd = data.cProd;
    this.cEAN = data.cEAN;
    this.cBarra = data.cBarra;
    this.xProd = data.xProd;
    this.NCM = data.NCM;
    this.NVE = data.NVE;
    this.CEST = data.CEST;
    this.indEscala = data.indEscala;
    this.CNPJFab = data.CNPJFab;
    this.cBenef = data.cBenef;
    this.gCred = data.gCred;
    this.EXTIPI = data.EXTIPI;
    this.CFOP = data.CFOP;
    this.uCom = data.uCom;
    this.qCom = data.qCom;
    this.vUnCom = data.vUnCom;
    this.vProd = data.vProd;
    this.cEANTrib = data.cEANTrib;
    this.cBarraTrib = data.cBarraTrib;
    this.uTrib = data.uTrib;
    this.qTrib = data.qTrib;
    this.vUnTrib = data.vUnTrib;
    this.vFrete = data.vFrete;
    this.vSeg = data.vSeg;
    this.vDesc = data.vDesc;
    this.vOutro = data.vOutro;
    this.indTot = data.indTot;
    this.detExport = data.detExport;
    this.xPed = data.xPed;
    this.nItemPed = data.nItemPed;
    this.nFCI = data.nFCI;
    this.rastro = data.rastro;
    this.infProdNFF = data.infProdNFF;
    this.infProdEmb = data.infProdEmb;
    this.veicProd = data.veicProd;
    this.med = data.med;
    this.arma = data.arma;
    this.comb = data.comb;
    this.nRECOPI = data.nRECOPI;

    this.validateOrThrow();
  }

  public validateOrThrow(): void {
    if (!this.cProd || this.cProd.length < 1 || this.cProd.length > 60) {
      throw new Error('Código do produto (cProd) é obrigatório e deve ter entre 1 e 60 caracteres.');
    }

    if (!this.cEAN || !/^(SEM GTIN|[0-9]{0}|[0-9]{8}|[0-9]{12,14})$/.test(this.cEAN)) {
      throw new Error('GTIN (cEAN) do produto é obrigatório e inválido.');
    }

    // cBarra (Código de barras diferente do GTIN)
    if (this.cBarra !== undefined && this.cBarra !== null && (this.cBarra.length < 3 || this.cBarra.length > 30)) {
      throw new Error('Código de barras (cBarra) deve ter entre 3 e 30 caracteres, se informado.');
    }

    // xProd (Descrição do produto ou serviço)
    if (!this.xProd || this.xProd.length < 1 || this.xProd.length > 120) {
      throw new Error('Descrição do produto (xProd) é obrigatória e deve ter entre 1 e 120 caracteres.');
    }

    // NCM (Código NCM)
    if (!this.NCM || !/^[0-9]{2}|[0-9]{8}$/.test(this.NCM)) {
      throw new Error('NCM inválido. Deve ter 2 ou 8 dígitos.');
    }

    // NVE (Nomenclatura de Valor Aduaneiro e Estatístico)
    if (this.NVE !== undefined && this.NVE !== null && !/^[A-Z]{2}[0-9]{4}$/.test(this.NVE)) {
      throw new Error('NVE inválido, se informado. Formato: AA9999.');
    }

    // CEST (Código Especificador da Substituição Tributária)
    if (this.CEST !== undefined && this.CEST !== null && !/^[0-9]{7}$/.test(this.CEST)) {
      throw new Error('CEST inválido, se informado. Deve ter 7 dígitos.');
    }

    // indEscala (Indicador de escala)
    if (this.indEscala !== undefined && this.indEscala !== null && !['S', 'N'].includes(this.indEscala)) {
      throw new Error('Indicador de escala (indEscala) inválido. Deve ser "S" ou "N".');
    }

    // CNPJFab (CNPJ do fabricante)
    if (this.CNPJFab !== undefined && this.CNPJFab !== null && this.CNPJFab.length !== 14) {
      throw new Error('CNPJ do Fabricante (CNPJFab) inválido, se informado. Deve ter 14 dígitos.');
    }

    // cBenef (Código do benefício fiscal)
    if (this.cBenef !== undefined && this.cBenef !== null && !/^([!-ÿ]{8}|[!-ÿ]{10}|SEM CBENEF)?$/.test(this.cBenef)) {
      throw new Error('Código de benefício fiscal (cBenef) inválido, se informado.');
    }

    // EXTIPI (Exceção da Tabela TIPI)
    if (this.EXTIPI !== undefined && this.EXTIPI !== null && !/^[0-9]{2,3}$/.test(this.EXTIPI)) {
        throw new Error('Exceção da Tabela TIPI (EXTIPI) inválida, se informada. Deve ter 2 ou 3 dígitos numéricos.');
    }

    // CFOP (Código Fiscal de Operação e Prestação)
    if (!this.CFOP || !/^[1-7]{1}[0-9]{3}$/.test(this.CFOP)) {
      throw new Error('CFOP é obrigatório e inválido. Deve iniciar com 1-7 e ter 4 dígitos.');
    }

    // uCom (Unidade Comercial)
    if (!this.uCom || this.uCom.length < 1 || this.uCom.length > 6) {
      throw new Error('Unidade comercial (uCom) é obrigatória e deve ter entre 1 e 6 caracteres.');
    }

    // qCom (Quantidade Comercial)
    if (typeof this.qCom !== 'number' || this.qCom <= 0) {
      throw new Error('Quantidade comercial (qCom) é obrigatória e deve ser um número maior que zero.');
    }

    // vUnCom (Valor Unitário de Comercialização)
    if (typeof this.vUnCom !== 'number' || this.vUnCom < 0) {
      throw new Error('Valor unitário comercial (vUnCom) é obrigatório e não pode ser negativo.');
    }

    // vProd (Valor Total Bruto do Produto/Serviço)
    if (typeof this.vProd !== 'number' || this.vProd < 0) {
      throw new Error('Valor total bruto do produto (vProd) é obrigatório e não pode ser negativo.');
    }

    // cEANTrib (GTIN da Unidade Tributável)
    if (!this.cEANTrib || !/^(SEM GTIN|[0-9]{0}|[0-9]{8}|[0-9]{12,14})$/.test(this.cEANTrib)) {
      throw new Error('GTIN da unidade tributável (cEANTrib) é obrigatório e inválido.');
    }

    // cBarraTrib (Código de barras da unidade tributável)
    if (this.cBarraTrib !== undefined && this.cBarraTrib !== null && (this.cBarraTrib.length < 3 || this.cBarraTrib.length > 30)) {
      throw new Error('Código de barras da unidade tributável (cBarraTrib) deve ter entre 3 e 30 caracteres, se informado.');
    }

    // uTrib (Unidade Tributável)
    if (this.uTrib !== undefined && this.uTrib !== null && (this.uTrib.length < 1 || this.uTrib.length > 6)) {
      throw new Error('Unidade tributável (uTrib) deve ter entre 1 e 6 caracteres, se informado.');
    }

    // qTrib (Quantidade Tributável)
    if (this.qTrib !== undefined && this.qTrib !== null && (typeof this.qTrib !== 'number' || this.qTrib < 0)) {
      throw new Error('Quantidade tributável (qTrib) deve ser um número não negativo, se informado.');
    }

    // vUnTrib (Valor Unitário de Tributação)
    if (this.vUnTrib !== undefined && this.vUnTrib !== null && (typeof this.vUnTrib !== 'number' || this.vUnTrib < 0)) {
      throw new Error('Valor unitário tributável (vUnTrib) deve ser um número não negativo, se informado.');
    }

    // vFrete, vSeg, vDesc, vOutro (Valores opcionais numéricos)
    const optionalNumericFields = ['vFrete', 'vSeg', 'vDesc', 'vOutro'];
    for (const field of optionalNumericFields) {
      const value = (this as any)[field];
      if (value !== undefined && value !== null && (typeof value !== 'number' || value < 0)) {
        throw new Error(`Campo ${field} inválido. Deve ser um número não negativo se presente.`);
      }
    }

    // indTot (Indicador de totalização)
    if (this.indTot !== undefined && this.indTot !== null && !['0', '1'].includes(this.indTot)) {
      throw new Error('Indicador de totalização (indTot) inválido. Deve ser "0" ou "1", se informado.');
    }

    // xPed (Número do Pedido de Compra)
    if (this.xPed !== undefined && this.xPed !== null && (this.xPed.length < 1 || this.xPed.length > 15)) {
      throw new Error('Número do Pedido de Compra (xPed) deve ter entre 1 e 15 caracteres, se informado.');
    }

    // nRECOPI (Número do RECOPI)
    if (this.nRECOPI !== undefined && this.nRECOPI !== null && (this.nRECOPI.length < 1 || this.nRECOPI.length > 20)) {
        throw new Error('Número do RECOPI (nRECOPI) deve ter entre 1 e 20 caracteres, se informado.');
    }

    // As validações de VOs aninhados (detExport, gCred, infProdEmb, infProdNFF, rastro, veicProd, med, arma, comb)
    // ocorreriam dentro dos seus respectivos construtores quando instanciados.
    // Se eles são opcionais e não forem instanciados, não haverá validação.
  }

  public getValorTotalLiquido(): number {
    return this.vProd - (this.vDesc || 0) + (this.vFrete || 0) + (this.vSeg || 0) + (this.vOutro || 0);
  }

  public equals(other: Prod): boolean {
    return this.cProd === other.cProd &&
      this.cEAN === other.cEAN &&
      this.cBarra === other.cBarra &&
      this.xProd === other.xProd &&
      this.NCM === other.NCM &&
      this.NVE === other.NVE &&
      this.CEST === other.CEST &&
      this.indEscala === other.indEscala &&
      this.CNPJFab === other.CNPJFab &&
      this.cBenef === other.cBenef &&
      this.gCred === other.gCred &&
      this.EXTIPI === other.EXTIPI &&
      this.CFOP === other.CFOP &&
      this.uCom === other.uCom &&
      this.qCom === other.qCom &&
      this.vUnCom === other.vUnCom &&
      this.vProd === other.vProd &&
      this.cEANTrib === other.cEANTrib &&
      this.cBarraTrib === other.cBarraTrib &&
      this.uTrib === other.uTrib &&
      this.qTrib === other.qTrib &&
      this.vUnTrib === other.vUnTrib &&
      this.vFrete === other.vFrete &&
      this.vSeg === other.vSeg &&
      this.vDesc === other.vDesc &&
      this.vOutro === other.vOutro &&
      this.indTot === other.indTot &&
      this.detExport === other.detExport &&
      this.xPed === other.xPed &&
      this.nItemPed === other.nItemPed &&
      this.nFCI === other.nFCI &&
      this.rastro === other.rastro &&
      this.infProdNFF === other.infProdNFF &&
      this.infProdEmb === other.infProdEmb &&
      this.veicProd === other.veicProd &&
      this.med === other.med &&
      this.arma === other.arma &&
      this.comb === other.comb &&
      this.nRECOPI === other.nRECOPI
  }

  public toJSON() {
    return {
      cProd: this.cProd,
      cEAN: this.cEAN,
      cBarra: this.cBarra,
      xProd: this.xProd,
      NCM: this.NCM,
      NVE: this.NVE,
      CEST: this.CEST,
      indEscala: this.indEscala,
      CNPJFab: this.CNPJFab,
      cBenef: this.cBenef,
      gCred: this.gCred,
      EXTIPI: this.EXTIPI,
      CFOP: this.CFOP,
      uCom: this.uCom,
      qCom: this.qCom,
      vUnCom: this.vUnCom,
      vProd: this.vProd,
      cEANTrib: this.cEANTrib,
      cBarraTrib: this.cBarraTrib,
      uTrib: this.uTrib,
      qTrib: this.qTrib,
      vUnTrib: this.vUnTrib,
      vFrete: this.vFrete,
      vSeg: this.vSeg,
      vDesc: this.vDesc,
      vOutro: this.vOutro,
      indTot: this.indTot,
      detExport: this.detExport,
      xPed: this.xPed,
      nItemPed: this.nItemPed,
      nFCI: this.nFCI,
      rastro: this.rastro,
      infProdNFF: this.infProdNFF,
      infProdEmb: this.infProdEmb,
      veicProd: this.veicProd,
      med: this.med,
      arma: this.arma,
      comb: this.comb,
      nRECOPI: this.nRECOPI,
    }
  }
}