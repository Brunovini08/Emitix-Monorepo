import { AutXML } from "../values-objects/autXML.vo";
import { Avulsa } from "../values-objects/avulsa.vo";
import { cana } from "../values-objects/cana/cana.vo";
import { cobr } from "../values-objects/cobr/cobr.vo";
import { compra } from "../values-objects/compra.vo";
import { Dest } from "../values-objects/dest/dest.vo";
import { Det } from "../values-objects/det/det.vo";
import { Emit } from "../values-objects/emit/emit.vo";
import { exporta } from "../values-objects/exporta.vo";
import { Ide } from "../values-objects/ide/ide.vo";
import { infAdic } from "../values-objects/infAdic/infAdic.vo";
import { infIntermed } from "../values-objects/infIntermed.vo";
import { infRespTec } from "../values-objects/infRespecTec/infRespTec.vo";
import { pag } from "../values-objects/pag/pag.vo";
import { TLocalVO } from "../values-objects/tlocal.vo";
import { Total } from "../values-objects/total/total.vo";
import { transp } from "../values-objects/transp/transp.vo";
import { infSolicNFF } from "../values-objects/infSolicNFF.vo";
import { agropecuario } from "../values-objects/agropecuario/agropecuario.vo";

export interface NFeData {
  ide: Ide;
  emit: Emit;
  avulsa?: Avulsa;
  dest?: Dest;
  retirada?: TLocalVO;
  entrega?: TLocalVO;
  authXML?: AutXML[];
  det: Det[];
  total: Total;
  transp: transp;
  cobr?: cobr;
  pag: pag;
  infIntermed?: infIntermed;
  infAdic?: infAdic;
  exporta?: exporta;
  compra?: compra;
  cana?: cana;
  infRespTec?: infRespTec;
  infSolicNFF?: infSolicNFF;
  agropecuario?: agropecuario;
}

export class NFe {
  private nfeDV: string;
  private chaveAcesso: string;
  private cnf: string;
  ide: Ide;
  emit: Emit;
  avulsa?: Avulsa;
  dest?: Dest;
  retirada?: TLocalVO;
  entrega?: TLocalVO;
  authXML?: AutXML[];
  det: Det[];
  total: Total;
  transp: transp;
  cobr?: cobr;
  pag: pag;
  infIntermed?: infIntermed;
  infAdic?: infAdic;
  exporta?: exporta;
  compra?: compra;
  cana?: cana;
  infRespTec?: infRespTec;
  infSolicNFF?: infSolicNFF;
  agropecuario?: agropecuario;

  constructor(data: NFeData) {
    this.ide = data.ide;
    this.emit = data.emit;
    this.avulsa = data.avulsa;
    this.dest = data.dest;
    this.retirada = data.retirada;
    this.entrega = data.entrega;
    this.authXML = data.authXML;
    this.det = data.det;
    this.total = data.total;
    this.transp = data.transp;
    this.cobr = data.cobr;
    this.pag = data.pag;
    this.infIntermed = data.infIntermed;
    this.infAdic = data.infAdic;
    this.exporta = data.exporta;
    this.compra = data.compra;
    this.cana = data.cana;
    this.infRespTec = data.infRespTec;
    this.infSolicNFF = data.infSolicNFF;
    this.agropecuario = data.agropecuario; 

    const cNF = this.gerarCNF();

    const dadosChave = {
      cUF: String(this.ide.cUF),
      cnpj: String(this.emit.CNPJ),
      modelo: String(this.ide.mod),
      serie: String(this.ide.serie),
      nNF: String(this.ide.nNF),
      cNF: cNF,
      tpEmis: String(this.ide.tpEmis),
      dhEmi: String(this.ide.dhEmi),
    };

    const chaveParcial = this.gerarChaveParcial(dadosChave);
    this.nfeDV = this.nfeCalcDigitoVerificador(chaveParcial);
    this.chaveAcesso = chaveParcial + this.nfeDV;
    this.validarChaveAcesso(this.chaveAcesso, dadosChave);
    this.cnf = dadosChave.cNF;

    this.ide = new Ide({
      ...this.ide,
      cDV: this.nfeDV,
      cNF: cNF,
    });
    this.validateOrThrow();
    this.autoCorrectAndWarn();
  }

  private gerarCNF() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }

  private gerarChaveParcial({ cUF, cnpj, modelo, serie, nNF, cNF, tpEmis, dhEmi }): string {
    const emissionDate = new Date(String(dhEmi));
    const AAMM =
      emissionDate.getFullYear().toString().slice(-2) +
      (emissionDate.getMonth() + 1).toString().padStart(2, '0');

    const cUFFormat = String(cUF).padStart(2, '0');
    const cnpjFormat = String(cnpj).padStart(14, '0');
    const modeloFormat = String(modelo).padStart(2, '0');
    const serieFormat = String(serie).padStart(3, '0');
    const nNFFormat = String(nNF).padStart(9, '0');
    const tpEmisFormat = String(tpEmis).padStart(1, '0');
    const cNFFormat = String(cNF).padStart(8, '0');

    const chaveParcial = cUFFormat + AAMM + cnpjFormat + modeloFormat + serieFormat + nNFFormat + tpEmisFormat + cNFFormat;
    if (chaveParcial.length !== 43) {
      throw new Error(`Chave parcial deve ter 43 dígitos, mas tem ${chaveParcial.length}`);
    }

    return chaveParcial;
  }

  private nfeCalcDigitoVerificador(chave: string): string {
    if (chave.length !== 43) {
      throw new Error(`A chave de acesso deve ter 43 caracteres, mas tem ${chave.length}`);
    }

    let soma = 0;
    let peso = 2;
    for (let i = chave.length - 1; i >= 0; i--) {
      const digito = parseInt(chave[i], 10);
      if (isNaN(digito)) {
        throw new Error(`Caractere inválido na posição ${i}: ${chave[i]}`);
      }
      soma += digito * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }

    const resto = soma % 11;
    const digito = (resto === 0 || resto === 1) ? 0 : 11 - resto;
    return digito.toString();
  }

  private validarChaveAcesso(chave: string, dados: any): void {
    if (chave.length !== 44) throw new Error(`Chave de acesso deve ter 44 dígitos, mas tem ${chave.length}`);
    if (!/^[0-9]{44}$/.test(chave)) throw new Error('Chave de acesso deve conter apenas números');

    const cUF = chave.substring(0, 2);
    const cnpj = chave.substring(6, 20);
    const modelo = chave.substring(20, 22);
    const serie = chave.substring(22, 25);
    const nNF = chave.substring(25, 34);
    const tpEmis = chave.substring(34, 35);
    const cNF = chave.substring(35, 43);

    if (cUF !== dados.cUF.padStart(2, '0')) throw new Error(`cUF na chave (${cUF}) não corresponde ao original (${dados.cUF})`);
    if (cnpj !== dados.cnpj.padStart(14, '0')) throw new Error(`CNPJ na chave (${cnpj}) não corresponde ao original (${dados.cnpj})`);
    if (modelo !== dados.modelo.padStart(2, '0')) throw new Error(`Modelo na chave (${modelo}) não corresponde ao original (${dados.modelo})`);
    if (serie !== dados.serie.padStart(3, '0')) throw new Error(`Série na chave (${serie}) não corresponde ao original (${dados.serie})`);
    if (nNF !== dados.nNF.padStart(9, '0')) throw new Error(`nNF na chave (${nNF}) não corresponde ao original (${dados.nNF})`);
    if (tpEmis !== dados.tpEmis.padStart(1, '0')) throw new Error(`tpEmis na chave (${tpEmis}) não corresponde ao original (${dados.tpEmis})`);
    if (cNF !== dados.cNF.padStart(8, '0')) throw new Error(`cNF na chave (${cNF}) não corresponde ao original (${dados.cNF})`);
  }

 
  public validateTotalsAndPercents(): void {
    this.det.forEach((item, idx) => {
      const icms = item.imposto?.ICMS;
      if (!icms) return;
      const gruposPossiveis = [
        'ICMS10', 'ICMS30', 'ICMS60', 'ICMS70', 'ICMS90',
        'ICMSSN201', 'ICMSSN202', 'ICMSSN900', 'ICMSST'
      ];
      for (const grupo of gruposPossiveis) {
        if (icms[grupo] && icms[grupo].pFCPST !== undefined) {
          const pFCPST = Number(icms[grupo].pFCPST);
          if (pFCPST === 0) {
            console.warn(`Rejeição 881: Percentual de FCPST igual a zero no item ${idx + 1}`);
          }
        }
      }
    });

    let somaBCST = 0;
    this.det.forEach((item) => {
      const icms = item.imposto?.ICMS;
      if (!icms) return;
      const gruposPossiveis = [
        'ICMS10', 'ICMS30', 'ICMS70', 'ICMS90',
        'ICMSSN201', 'ICMSSN202', 'ICMSSN900', 'ICMSST'
      ];
      for (const grupo of gruposPossiveis) {
        if (icms[grupo] && icms[grupo].vBCST !== undefined) {
          somaBCST += Number(icms[grupo].vBCST);
        }
      }
    });
    if (Number(this.total.ICMSTot.vBCST) !== somaBCST) {
      console.warn(`Rejeição 533: Total da BC ICMS-ST (${this.total.ICMSTot.vBCST}) difere do somatório dos itens (${somaBCST})`);
    }

    let somaICMSST = 0;
    this.det.forEach((item) => {
      const icms = item.imposto?.ICMS;
      if (!icms) return;
      const gruposPossiveis = [
        'ICMS10', 'ICMS30', 'ICMS70', 'ICMS90',
        'ICMSSN201', 'ICMSSN202', 'ICMSSN900', 'ICMSST'
      ];
      for (const grupo of gruposPossiveis) {
        if (icms[grupo] && icms[grupo].vICMSST !== undefined) {
          somaICMSST += Number(icms[grupo].vICMSST);
        }
      }
    });
    if (Number(this.total.ICMSTot.vST) !== somaICMSST) {
      console.warn(`Rejeição 534: Total do ICMS-ST (${this.total.ICMSTot.vST}) difere do somatório dos itens (${somaICMSST})`);
    }
  }

  private cleanObject(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.cleanObject(item)).filter((item) => item !== null && item !== undefined);
    } else if (obj !== null && typeof obj === 'object') {
      const cleanedObj: any = {};
      for (const key in obj) {
        const cleanedValue = this.cleanObject(obj[key]);
        if (cleanedValue !== null && cleanedValue !== undefined && !(Array.isArray(cleanedValue) && cleanedValue.length === 0)) {
          cleanedObj[key] = cleanedValue;
        }
      }
      return Object.keys(cleanedObj).length > 0 ? cleanedObj : undefined;
    }
    return obj;
  }

  public validateOrThrow() {
    this.validateTotalsAndPercents();
    this.validateFCPST();
  }

  private validateFCPST() {
    this.det.forEach((item, idx) => {
      const icms = item.imposto?.ICMS;
      if (!icms) return;
      const gruposPossiveis = [
        'ICMS10', 'ICMS30', 'ICMS60', 'ICMS70', 'ICMS90',
        'ICMSSN201', 'ICMSSN202', 'ICMSSN900', 'ICMSST'
      ];
      for (const grupo of gruposPossiveis) {
        if (icms[grupo] && icms[grupo].pFCPST !== undefined) {
          const pFCPST = Number(icms[grupo].pFCPST);
          if (pFCPST === 0) {
            console.warn(`Rejeição 881: Percentual de FCPST igual a zero no item ${idx + 1}`);
          }
        }
      }
    });
  }

  public autoCorrectAndWarn(): string[] {
    const warnings: string[] = [];

    // 1. Corrigir pFCPST igual a zero (Rejeição 881)
    this.det.forEach((item, idx) => {
      const icms = item.imposto?.ICMS;
      if (!icms) return;
      const gruposPossiveis = [
        'ICMS10', 'ICMS30', 'ICMS60', 'ICMS70', 'ICMS90',
        'ICMSSN201', 'ICMSSN202', 'ICMSSN900', 'ICMSST'
      ];
      for (const grupo of gruposPossiveis) {
        if (icms[grupo] && icms[grupo].pFCPST !== undefined) {
          const pFCPST = Number(icms[grupo].pFCPST);
          if (pFCPST === 0) {
            // Corrige removendo o campo
            delete icms[grupo].pFCPST;
            warnings.push(`Item ${idx + 1}: Percentual de FCPST estava igual a zero e foi removido para evitar rejeição 881.`);
          }
        }
      }
    });

    // 2. Corrigir total da BC ICMS-ST (Rejeição 533)
    let somaBCST = 0;
    this.det.forEach((item) => {
      const icms = item.imposto?.ICMS;
      if (!icms) return;
      const gruposPossiveis = [
        'ICMS10', 'ICMS30', 'ICMS70', 'ICMS90',
        'ICMSSN201', 'ICMSSN202', 'ICMSSN900', 'ICMSST'
      ];
      for (const grupo of gruposPossiveis) {
        if (icms[grupo] && icms[grupo].vBCST !== undefined) {
          somaBCST += Number(icms[grupo].vBCST);
        }
      }
    });
    if (Number(this.total.ICMSTot.vBCST) !== somaBCST) {
      warnings.push(`Total da BC ICMS-ST (${this.total.ICMSTot.vBCST}) foi corrigido para o somatório dos itens (${somaBCST}) para evitar rejeição 533.`);
      this.total.ICMSTot.vBCST = somaBCST;
    }

    // 3. Corrigir total do ICMS-ST (Rejeição 534)
    let somaICMSST = 0;
    this.det.forEach((item) => {
      const icms = item.imposto?.ICMS;
      if (!icms) return;
      const gruposPossiveis = [
        'ICMS10', 'ICMS30', 'ICMS70', 'ICMS90',
        'ICMSSN201', 'ICMSSN202', 'ICMSSN900', 'ICMSST'
      ];
      for (const grupo of gruposPossiveis) {
        if (icms[grupo] && icms[grupo].vICMSST !== undefined) {
          somaICMSST += Number(icms[grupo].vICMSST);
        }
      }
    });
    if (Number(this.total.ICMSTot.vST) !== somaICMSST) {
      warnings.push(`Total do ICMS-ST (${this.total.ICMSTot.vST}) foi corrigido para o somatório dos itens (${somaICMSST}) para evitar rejeição 534.`);
      this.total.ICMSTot.vST = somaICMSST;
    }

    // 4. Corrigir vNF (valor total da nota)
    const vNFCalculado = this.total.ICMSTot.calcularVNF(this.total.ICMSTot);
    if (Number(this.total.ICMSTot.vNF) !== vNFCalculado) {
      warnings.push(`O valor de vNF (${this.total.ICMSTot.vNF}) foi corrigido para o valor calculado (${vNFCalculado}) para evitar rejeição 610.`);
      this.total.ICMSTot.vNF = vNFCalculado;
    }

    return warnings;
  }

  public toJSON() {
    const nfe = {
      ide: this.ide.toJSON(),
      ...this.emit.toJSON(),
      avulsa: this.avulsa?.toJSON(),
      ...this.dest?.toJSON(),
      retirada: this.retirada?.toJSON(),
      entrega: this.entrega?.toJSON(),
      authXML: this.authXML?.map(auth => auth.toJSON()),
      det: this.det.map(d => d.toJSON()),
      total: this.total.toJSON(),
      transp: this.transp.toJSON(),
      cobr: this.cobr?.toJSON(),
      pag: this.pag.toJSON(),
      infIntermed: this.infIntermed?.toJSON(),
      infAdic: this.infAdic?.toJSON(),
      exporta: this.exporta?.toJSON(),
      compra: this.compra?.toJSON(),
      cana: this.cana?.toJSON(),
      infRespTec: this.infRespTec?.toJSON(),
      infSolicNFF: this.infSolicNFF?.toJSON(),
      agropecuario: this.agropecuario?.toJSON(),
    };

    return {
      NFe: this.cleanObject(nfe),
      nfeCNF: this.cnf,
      nfeChaveAcesso: this.chaveAcesso,
      nfeDV: this.nfeDV,
      versao: '4.00',
    };
  }
}
