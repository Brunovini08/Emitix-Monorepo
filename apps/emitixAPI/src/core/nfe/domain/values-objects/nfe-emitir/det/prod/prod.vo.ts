// src/domain/nfe/value-objects/nfe-item-prod.vo.ts

import { DomainError } from "src/core/nfe/domain/errors/domain.error";
import type { Comb } from "../comb/comb.vo";
import type { Arma } from "./arma.vo";
import type { DetExport } from "./detExport/detExport.vo";
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
  public readonly NVE?: string[];
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
  public readonly uTrib: string;
  public readonly qTrib: number; 
  public readonly vUnTrib: number; 
  public readonly vFrete?: number;
  public readonly vSeg?: number;
  public readonly vDesc?: number;
  public readonly vOutro?: number;
  public readonly indTot: string;
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
  public readonly comb?: Comb[]; // Substitua 'any' pelo VO Comb
  public readonly nRECOPI?: string;

  constructor(data: {
    cProd: string; cEAN: string; cBarra?: string; xProd: string; NCM: string;
    NVE?: string[]; CEST?: string; indEscala?: string; CNPJFab?: string; cBenef?: string;
    gCred?: GCred[]; EXTIPI?: string; CFOP: string; uCom: string; qCom: number;
    vUnCom: number; vProd: number; cEANTrib: string; cBarraTrib?: string; uTrib: string;
    qTrib: number; vUnTrib: number; vFrete?: number; vSeg?: number; vDesc?: number;
    vOutro?: number; indTot: string; detExport?: DetExport[]; xPed?: string; nItemPed?: string;
    nFCI?: string; rastro?: Rastro[]; infProdNFF?: InfProdNFF; infProdEmb?: InfProdEmb; veicProd?: VeicProd;
    med?: Med; arma?: Arma[]; comb?: Comb[]; nRECOPI?: string;
  }) {
    this.cProd = data.cProd;
    this.cEAN = data.cEAN;
    this.cBarra = data.cBarra || undefined;
    this.xProd = data.xProd;
    this.NCM = data.NCM;
    this.NVE = data.NVE || undefined;
    this.CEST = data.CEST || undefined;
    this.indEscala = data.indEscala || undefined;
    this.CNPJFab = data.CNPJFab || undefined;
    this.cBenef = data.cBenef || undefined;
    this.gCred = data.gCred || undefined;
    this.EXTIPI = data.EXTIPI || undefined;
    this.CFOP = data.CFOP;
    this.uCom = data.uCom;
    this.qCom = data.qCom;
    this.vUnCom = data.vUnCom;
    this.vProd = data.vProd;
    this.cEANTrib = data.cEANTrib;
    this.cBarraTrib = data.cBarraTrib || undefined;
    this.uTrib = data.uTrib
    this.qTrib = data.qTrib
    this.vUnTrib = data.vUnTrib;
    this.vFrete = data.vFrete || undefined;
    this.vSeg = data.vSeg || undefined;
    this.vDesc = data.vDesc || undefined;
    this.vOutro = data.vOutro || undefined;
    this.indTot = data.indTot;
    this.detExport = data.detExport || undefined;
    this.xPed = data.xPed || undefined;
    this.nItemPed = data.nItemPed || undefined;
    this.nFCI = data.nFCI || undefined;
    this.rastro = data.rastro || undefined;
    this.infProdNFF = data.infProdNFF || undefined;
    this.infProdEmb = data.infProdEmb || undefined;
    this.veicProd = data.veicProd || undefined;
    this.med = data.med || undefined;
    this.arma = data.arma || undefined;
    this.comb = data.comb || undefined;
    this.nRECOPI = data.nRECOPI || undefined;
    this.validateOrThrow();
  }

  public validateOrThrow(): void {
    if (!this.cProd || this.cProd.length < 1 || this.cProd.length > 60) {
      throw new DomainError('Código do produto (cProd) é obrigatório e deve ter entre 1 e 60 caracteres.');
    }

    if (!this.cEAN || !/^(SEM GTIN|[0-9]{0}|[0-9]{8}|[0-9]{12,14})$/.test(this.cEAN)) {
      throw new DomainError('GTIN (cEAN) do produto é obrigatório e inválido.');
    }

    // cBarra (Código de barras diferente do GTIN)
    if (this.cBarra !== undefined && this.cBarra !== null && (this.cBarra.length < 3 || this.cBarra.length > 30)) {
      throw new DomainError('Código de barras (cBarra) deve ter entre 3 e 30 caracteres, se informado.');
    }

    // xProd (Descrição do produto ou serviço)
    if (!this.xProd || this.xProd.length < 1 || this.xProd.length > 120) {
      throw new DomainError('Descrição do produto (xProd) é obrigatória e deve ter entre 1 e 120 caracteres.');
    }

    // NCM (Código NCM)
    if (!this.NCM || !/^[0-9]{2}|[0-9]{8}$/.test(this.NCM)) {
      throw new DomainError('NCM inválido. Deve ter 2 ou 8 dígitos.');
    }

    // NVE (Nomenclatura de Valor Aduaneiro e Estatístico)
      if (this.NVE !== undefined && this.NVE !== null && !this.NVE.every(nve => /^[A-Z]{2}[0-9]{4}$/.test(nve))) {
      throw new DomainError('NVE inválido, se informado. Formato: AA9999.');
    }

    // CEST (Código Especificador da Substituição Tributária)
    if (this.CEST !== undefined && this.CEST !== null && !/^[0-9]{7}$/.test(this.CEST)) {
      throw new DomainError('CEST inválido, se informado. Deve ter 7 dígitos.');
    }

    // indEscala (Indicador de escala)
    if (this.indEscala !== undefined && this.indEscala !== null && !['S', 'N'].includes(this.indEscala)) {
      throw new DomainError('Indicador de escala (indEscala) inválido. Deve ser "S" ou "N".');
    }

    // CNPJFab (CNPJ do fabricante)
    if (this.CNPJFab !== undefined && this.CNPJFab !== null && this.CNPJFab.length !== 14) {
      throw new DomainError('CNPJ do Fabricante (CNPJFab) inválido, se informado. Deve ter 14 dígitos.');
    }

    // cBenef (Código do benefício fiscal)
    if (this.cBenef !== undefined && this.cBenef !== null && !/^([!-ÿ]{8}|[!-ÿ]{10}|SEM CBENEF)?$/.test(this.cBenef)) {
      throw new DomainError('Código de benefício fiscal (cBenef) inválido, se informado.');
    }

    // EXTIPI (Exceção da Tabela TIPI)
    if (this.EXTIPI !== undefined && this.EXTIPI !== null && !/^[0-9]{2,3}$/.test(this.EXTIPI)) {
        throw new DomainError('Exceção da Tabela TIPI (EXTIPI) inválida, se informada. Deve ter 2 ou 3 dígitos numéricos.');
    }

    // CFOP (Código Fiscal de Operação e Prestação)
    if (!this.CFOP || !/^[1-7]{1}[0-9]{3}$/.test(this.CFOP)) {
      throw new DomainError('CFOP é obrigatório e inválido. Deve iniciar com 1-7 e ter 4 dígitos.');
    }

    // uCom (Unidade Comercial)
    if (!this.uCom || this.uCom.length < 1 || this.uCom.length > 6) {
      throw new DomainError('Unidade comercial (uCom) é obrigatória e deve ter entre 1 e 6 caracteres.');
    }

    // qCom (Quantidade Comercial)
    if (typeof this.qCom !== 'number' || this.qCom <= 0) {
      throw new DomainError('Quantidade comercial (qCom) é obrigatória e deve ser um número maior que zero.');
    }

    // vUnCom (Valor Unitário de Comercialização)
    if (typeof this.vUnCom !== 'number' || this.vUnCom < 0) {
      throw new DomainError('Valor unitário comercial (vUnCom) é obrigatório e não pode ser negativo.');
    }

    // vProd (Valor Total Bruto do Produto/Serviço)
    if (typeof this.vProd !== 'number' || this.vProd < 0) {
      throw new DomainError('Valor total bruto do produto (vProd) é obrigatório e não pode ser negativo.');
    }

    // cEANTrib (GTIN da Unidade Tributável)
    if (!this.cEANTrib || !/^(SEM GTIN|[0-9]{0}|[0-9]{8}|[0-9]{12,14})$/.test(this.cEANTrib)) {
      throw new DomainError('GTIN da unidade tributável (cEANTrib) é obrigatório e inválido.');
    }

    // cBarraTrib (Código de barras da unidade tributável)
    if (this.cBarraTrib !== undefined && this.cBarraTrib !== null && (this.cBarraTrib.length < 3 || this.cBarraTrib.length > 30)) {
      throw new DomainError('Código de barras da unidade tributável (cBarraTrib) deve ter entre 3 e 30 caracteres, se informado.');
    }

    // uTrib (Unidade Tributável)
    if (this.uTrib !== undefined && this.uTrib !== null && (this.uTrib.length < 1 || this.uTrib.length > 6)) {
      throw new DomainError('Unidade tributável (uTrib) deve ter entre 1 e 6 caracteres, se informado.');
    }

    // qTrib (Quantidade Tributável)
    if (this.qTrib !== undefined && this.qTrib !== null && (typeof this.qTrib !== 'number' || this.qTrib < 0)) {
      throw new DomainError('Quantidade tributável (qTrib) deve ser um número não negativo, se informado.');
    }

    // vUnTrib (Valor Unitário de Tributação)
    if (this.vUnTrib !== undefined && this.vUnTrib !== null && (typeof this.vUnTrib !== 'number' || this.vUnTrib < 0)) {
      throw new DomainError('Valor unitário tributável (vUnTrib) deve ser um número não negativo, se informado.');
    }

    // vFrete, vSeg, vDesc, vOutro (Valores opcionais numéricos)
    const optionalNumericFields = ['vFrete', 'vSeg', 'vDesc', 'vOutro'];
    for (const field of optionalNumericFields) {
      const value = (this as any)[field];
      if (value !== undefined && value !== null && (typeof value !== 'number' || value < 0)) {
        throw new DomainError(`Campo ${field} inválido. Deve ser um número não negativo se presente.`);
      }
    }

    // indTot (Indicador de totalização)
    if (this.indTot !== undefined && this.indTot !== null && !['0', '1'].includes(this.indTot)) {
      throw new DomainError('Indicador de totalização (indTot) inválido. Deve ser "0" ou "1", se informado.');
    }

    // xPed (Número do Pedido de Compra)
    if (this.xPed !== undefined && this.xPed !== null && (this.xPed.length < 1 || this.xPed.length > 15)) {
      throw new DomainError('Número do Pedido de Compra (xPed) deve ter entre 1 e 15 caracteres, se informado.');
    }

    // nRECOPI (Número do RECOPI)
    if (this.nRECOPI !== undefined && this.nRECOPI !== null && (this.nRECOPI.length < 1 || this.nRECOPI.length > 20)) {
        throw new DomainError('Número do RECOPI (nRECOPI) deve ter entre 1 e 20 caracteres, se informado.');
    }
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
      xProd: this.xProd,
      NCM: this.NCM,
      NVE: this.NVE,
      CEST: this.CEST,
      indEscala: this.indEscala,
      CNPJFab: this.CNPJFab,
      cBenef: this.cBenef,
      EXTIPI: this.EXTIPI,
      CFOP: this.CFOP,
      uCom: this.uCom,
      qCom: this.qCom.toFixed(4),
      vUnCom: this.vUnCom.toFixed(2),
      vProd: this.vProd.toFixed(2),
      cEANTrib: this.cEANTrib,
      uTrib: this.uTrib,
      qTrib: this.qTrib.toFixed(4),
      vUnTrib: this.vUnTrib.toFixed(2),
      vFrete: this.vFrete?.toFixed(2),
      vSeg: this.vSeg?.toFixed(2),
      vDesc: this.vDesc?.toFixed(2),
      vOutro: this.vOutro?.toFixed(2),
      indTot: this.indTot,
      detExport: this.detExport?.map(det => det.toJson()),
      xPed: this.xPed,
      nItemPed: this.nItemPed,
      nFCI: this.nFCI,
      nRECOPI: this.nRECOPI,
      veicProd: this.veicProd?.toJson(),
      med: this.med?.toJson(),
      arma: this.arma?.map(arma => arma.toJson()),
      comb: this.comb?.map(item => item.toJson()),
    };
  }
}