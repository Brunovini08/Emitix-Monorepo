import type { NFref } from "./nfref/NFref.vo";
import type { GCompraGov } from "./gCompraGov.vo";

export class Ide {
  public readonly cUF: string;
  public readonly cNF: string;
  public readonly natOp: string;
  public readonly mod: string;
  public readonly serie: string;
  public readonly nNF: string;
  public readonly dhSaiEnt?: string | undefined; 
  public readonly dhEmi: string;
  public readonly tpNF: string;
  public readonly idDest: string;
  public readonly cMunFG: string;
  public readonly cMunFGIBS?: string | undefined;
  public readonly tpImp: string;
  public readonly tpEmis: string; 
  public readonly cDV: string;
  public readonly tpAmb: string;
  public readonly finNFe: string;
  public readonly tpNFDebito?: string | undefined;
  public readonly tpNFCredito?: string | undefined;
  public readonly indFinal: string;
  public readonly indPres: string;
  public readonly indIntermed?: string | undefined;
  public readonly procEmi: string;
  public readonly verProc: string;
  public readonly dhCont?: string | undefined;  
  public readonly xJust?: string | undefined; 
  public readonly NFref?: NFref[];
  public readonly gCompraGov?: GCompraGov;
  constructor(
    data: {
      cUF: string;
      natOp: string;
      mod: string;
      serie: string;
      nNF: string;
      dhEmi: string;
      tpNF: string;
      idDest: string;
      cMunFG: string;
      tpImp: string;
      tpEmis: string;
      cDV: string;
      tpAmb: string;
      finNFe: string;
      indFinal: string;
      indPres: string;
      procEmi: string;
      verProc: string;
      cMunFGIBS?: string | undefined;
      dhSaiEnt?: string | undefined;
      dhCont?: string | undefined; 
      xJust?: string | undefined;
      tpNFDebito?: string | undefined;
      tpNFCredito?: string | undefined;
      indIntermed?: string | undefined;
      NFref?: NFref[] | undefined;
      gCompraGov?: GCompraGov | undefined;
      cNF?: string | undefined;
    },
  ) {
    this.cUF = data.cUF;
    this.cNF = data.cNF || this.nfeCNF();
    this.natOp = data.natOp;
    this.mod = data.mod;
    this.serie = data.serie;
    this.nNF = data.nNF;
    this.dhEmi = data.dhEmi;
    this.tpNF = data.tpNF;
    this.idDest = data.idDest;
    this.cMunFG = data.cMunFG;
    this.tpImp = data.tpImp;
    this.tpEmis = data.tpEmis;
    this.cDV = data.cDV;
    this.tpAmb = data.tpAmb;
    this.finNFe = data.finNFe;
    this.indFinal = data.indFinal;
    this.indPres = data.indPres;
    this.procEmi = data.procEmi;
    this.verProc = data.verProc;
    this.cMunFGIBS = data.cMunFGIBS || undefined;
    this.dhSaiEnt = data.dhSaiEnt || undefined;
    this.dhCont = data.dhCont || undefined;
    this.xJust = data.xJust || undefined;
    this.tpNFDebito = data.tpNFDebito || undefined;
    this.tpNFCredito = data.tpNFCredito || undefined;
    this.indIntermed = data.indIntermed || undefined;
    this.NFref = data.NFref || undefined;
    this.gCompraGov = data.gCompraGov || undefined;
    this.validateOrThrow();
  }

  

  private nfeCNF(): string {
    // Gerar um número de 8 dígitos baseado no timestamp para ser mais previsível
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000);
    const cnf = (timestamp % 90000000 + randomPart).toString().padStart(8, '0');
    return cnf;
  }
  
  public getNumeroFormatado(): string {
    return `${this.serie}-${this.nNF}`;
  }

  public validateOrThrow(): void {
    if (this.cUF.length !== 2) {
      throw new Error('Código da UF (cUF) inválido. Deve ter 2 dígitos.');
    }
    if (this.tpNF !== '0' && this.tpNF !== '1') {
      throw new Error('Tipo de Operação (tpNF) inválido. Deve ser "0" (Entrada) ou "1" (Saída).');
    }

    if (this.tpEmis !== '1') {
      if (this.dhCont === undefined) {
        throw new Error('Data e Hora de Entrada em Contingência (dhCont) é obrigatório quando tpEmis for diferente de "1".');
      }
      if (this.xJust === undefined) {
        throw new Error('Justificativa da Entrada em Contingência (xJust) é obrigatória quando tpEmis for diferente de "1".');
      }
      
    }
  }

  toJSON() {
    return {
      cUF: this.cUF,
      cNF: this.cNF,
      natOp: this.natOp,
      mod: this.mod,
      serie: this.serie,
      nNF: this.nNF,
      dhEmi: this.dhEmi,
      dhSaiEnt: this.dhSaiEnt || undefined,
      tpNF: this.tpNF,
      idDest: this.idDest,
      cMunFG: this.cMunFG,
      cMunFGIBS: this.cMunFGIBS || undefined,
      tpImp: this.tpImp,
      tpEmis: this.tpEmis,
      cDV: this.cDV,
      tpAmb: this.tpAmb,
      finNFe: this.finNFe,
      tpNFDebito: this.tpNFDebito || undefined,
      tpNFCredito: this.tpNFCredito || undefined,
      indFinal: this.indFinal,
      indPres: this.indPres,
      indIntermed: this.indIntermed || undefined,
      procEmi: this.procEmi,
      verProc: this.verProc,
      dhCont: this.dhCont || undefined,
      xJust: this.xJust || undefined,
      NFref: this.NFref?.map(ref => ref.toJSON()) || undefined,
      gCompraGov: this.gCompraGov?.toJSON() || undefined,
    };
  }
}