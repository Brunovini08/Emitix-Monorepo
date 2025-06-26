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
  avulsa?: Avulsa | undefined;
  dest?: Dest | undefined;
  retirada?: TLocalVO | undefined;
  entrega?: TLocalVO | undefined;
  authXML?: AutXML[] | undefined;
  det: Det[];
  total: Total;
  transp: transp;
  cobr?: cobr | undefined;
  pag: pag;
  infIntermed?: infIntermed | undefined;
  infAdic?: infAdic | undefined;
  exporta?: exporta | undefined;
  compra?: compra | undefined;
  cana?: cana | undefined;
  infRespTec?: infRespTec | undefined;
  infSolicNFF?: infSolicNFF | undefined;
  agropecuario?: agropecuario | undefined;

  constructor(data: NFeData) {
    this.ide = data.ide;
    this.emit = data.emit;
    this.avulsa = data.avulsa
    this.dest = data.dest
    this.retirada = data.retirada
    this.entrega = data.entrega
    this.authXML = data.authXML
    this.det = data.det;
    this.total = data.total;
    this.transp = data.transp;
    this.cobr = data.cobr
    this.pag = data.pag;
    this.infIntermed = data.infIntermed
    this.infAdic = data.infAdic
    this.exporta = data.exporta
    this.compra = data.compra
    this.cana = data.cana
    this.infRespTec = data.infRespTec
    this.infSolicNFF = data.infSolicNFF
    this.agropecuario = data.agropecuario
    
    // Gerar chave parcial primeiro
    const dadosChave = {
      cUF: String(this.ide.cUF),
      cnpj: String(this.emit.CNPJ),
      modelo: String(this.ide.mod),
      serie: String(this.ide.serie),
      nNF: String(this.ide.nNF),
      cNF: this.ide.cNF,
      tpEmis: String(this.ide.tpEmis),
      dhEmi: String(this.ide.dhEmi),
    };
    
    const chaveParcial = this.gerarChaveParcial(dadosChave);
    
    // Calcular dígito verificador
    this.nfeDV = this.nfeCalcDigitoVerificador(chaveParcial);
    
    // Gerar chave completa
    this.chaveAcesso = chaveParcial + this.nfeDV;
    
    // Validar a chave de acesso
    this.validarChaveAcesso(this.chaveAcesso, dadosChave);
    
    // Atualizar o cDV na Ide
    this.atualizarCDVNaIde();
  }

  private atualizarCDVNaIde(): void {
    const ideData = {
      cUF: this.ide.cUF,
      natOp: this.ide.natOp,
      mod: this.ide.mod,
      serie: this.ide.serie,
      nNF: this.ide.nNF,
      cDV: this.nfeDV,
      dhEmi: this.ide.dhEmi,
      tpNF: this.ide.tpNF,
      idDest: this.ide.idDest,
      cMunFG: this.ide.cMunFG,
      tpImp: this.ide.tpImp,
      tpEmis: this.ide.tpEmis,
      tpAmb: this.ide.tpAmb,
      finNFe: this.ide.finNFe,
      indFinal: this.ide.indFinal,
      indPres: this.ide.indPres,
      procEmi: this.ide.procEmi,
      verProc: this.ide.verProc,
      cMunFGIBS: this.ide.cMunFGIBS,
      dhSaiEnt: this.ide.dhSaiEnt,
      dhCont: this.ide.dhCont,
      xJust: this.ide.xJust,
      tpNFDebito: this.ide.tpNFDebito,
      tpNFCredito: this.ide.tpNFCredito,
      indIntermed: this.ide.indIntermed,
      NFref: this.ide.NFref,
      gCompraGov: this.ide.gCompraGov,
    };
    
    this.ide = new Ide(ideData);
  }

  private gerarChaveParcial({
    cUF,
    cnpj,
    modelo,
    serie,
    nNF,
    cNF,
    tpEmis,
    dhEmi,
  }): string {
    const emissionDate = new Date(String(dhEmi));
    const AAMM =
      emissionDate.getFullYear().toString().slice(-2) +
      (emissionDate.getMonth() + 1).toString().padStart(2, '0');
    
    // Formatar todos os campos com o tamanho correto
    const cUFFormat = String(cUF).padStart(2, '0');
    const cnpjFormat = String(cnpj).padStart(14, '0');
    const modeloFormat = String(modelo).padStart(2, '0');
    const serieFormat = String(serie).padStart(3, '0');
    const nNFFormat = String(nNF).padStart(9, '0');
    const tpEmisFormat = String(tpEmis).padStart(1, '0');
    const cNFFormat = String(cNF).padStart(8, '0');

    const chaveParcial = cUFFormat + AAMM + cnpjFormat + modeloFormat + serieFormat + nNFFormat + tpEmisFormat + cNFFormat;
    
    // Verificar se a chave parcial tem exatamente 43 dígitos
    if (chaveParcial.length !== 43) {
      throw new Error(`Chave parcial deve ter 43 dígitos, mas tem ${chaveParcial.length}. Chave: ${chaveParcial}`);
    }
    
    return chaveParcial;
  }

  private nfeCalcDigitoVerificador(chave: string): string {
    if (chave.length !== 43) {
      throw new Error(`A chave de acesso deve ter 43 caracteres, mas tem ${chave.length}`);
    }
    
    try {
      let peso = 2;
      let soma = 0;

      // Calcular da direita para a esquerda
      for (let i = chave.length - 1; i >= 0; i--) {
        const digito = parseInt(chave[i], 10);
        if (isNaN(digito)) {
          throw new Error(`Caractere inválido na posição ${i}: ${chave[i]}`);
        }
        soma += digito * peso;
        peso = peso < 9 ? peso + 1 : 2;
      }

      const resto = soma % 11;
      const digito = (resto === 0 || resto === 1) ? 0 : 11 - resto;
      
      return digito.toString();
    } catch (error) {
      throw new Error(`Erro ao calcular dígito verificador: ${error.message}`);
    }
  }

  private validarChaveAcesso(chave: string, dados: any): void {
    if (chave.length !== 44) {
      throw new Error(`Chave de acesso deve ter 44 dígitos, mas tem ${chave.length}`);
    }
    
    // Verificar se a chave contém apenas números
    if (!/^\d{44}$/.test(chave)) {
      throw new Error('Chave de acesso deve conter apenas números');
    }
    
    // Verificar se os campos estão corretos na chave
    const cUF = chave.substring(0, 2);
    const cnpj = chave.substring(6, 20);
    const modelo = chave.substring(20, 22);
    const serie = chave.substring(22, 25);
    const nNF = chave.substring(25, 34);
    const tpEmis = chave.substring(34, 35);
    const cNF = chave.substring(35, 43);
    
    // Verificar se os campos correspondem aos dados originais
    if (cUF !== dados.cUF.padStart(2, '0')) {
      throw new Error(`cUF na chave (${cUF}) não corresponde ao cUF original (${dados.cUF})`);
    }
    if (cnpj !== dados.cnpj.padStart(14, '0')) {
      throw new Error(`CNPJ na chave (${cnpj}) não corresponde ao CNPJ original (${dados.cnpj})`);
    }
    if (modelo !== dados.modelo.padStart(2, '0')) {
      throw new Error(`Modelo na chave (${modelo}) não corresponde ao modelo original (${dados.modelo})`);
    }
    if (serie !== dados.serie.padStart(3, '0')) {
      throw new Error(`Série na chave (${serie}) não corresponde à série original (${dados.serie})`);
    }
    if (nNF !== dados.nNF.padStart(9, '0')) {
      throw new Error(`nNF na chave (${nNF}) não corresponde ao nNF original (${dados.nNF})`);
    }
    if (tpEmis !== dados.tpEmis.padStart(1, '0')) {
      throw new Error(`tpEmis na chave (${tpEmis}) não corresponde ao tpEmis original (${dados.tpEmis})`);
    }
    if (cNF !== dados.cNF.padStart(8, '0')) {
      throw new Error(`cNF na chave (${cNF}) não corresponde ao cNF original (${dados.cNF})`);
    }
  }

  private cleanObject(obj: any): any {
    if (Array.isArray(obj)) {
      return obj
        .map((item) => this.cleanObject(item))
        .filter((item) => item !== null && item !== undefined);
    } else if (obj !== null && typeof obj === 'object') {
      const cleanedObj: any = {};
      for (const key in obj) {
        const cleanedValue = this.cleanObject(obj[key]);
        if (
          cleanedValue !== null &&
          cleanedValue !== undefined &&
          !(Array.isArray(cleanedValue) && cleanedValue.length === 0)
        ) {
          cleanedObj[key] = cleanedValue;
        }
      }
      return Object.keys(cleanedObj).length > 0 ? cleanedObj : undefined;
    }
    return obj;
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
    }
    
    return {
      NFe: this.cleanObject(nfe),
      nfeCNF: this.cnf,
      nfeChaveAcesso: this.chaveAcesso,
      nfeDV: this.nfeDV,
      versao: '4.00',
    }
  }

  
}
