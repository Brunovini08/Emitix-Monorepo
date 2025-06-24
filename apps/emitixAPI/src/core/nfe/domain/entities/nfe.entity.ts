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
    console.log({
      avulsa: this.avulsa,
    })
    this.chaveAcesso = this.nfeChaveAcesso({
      cUF: String(this.ide.cUF),
      cnpj: String(this.emit.CNPJ),
      modelo: String(this.ide.mod),
      serie: String(this.ide.serie),
      nNF: String(this.ide.nNF),
      cNF: this.cnf,
      tpEmis: String(this.ide.tpEmis),
      dhEmi: String(this.ide.dhEmi),
    })
    this.nfeDV = this.nfeCalcDigitoVerificador(String(this.nfeChaveAcesso))
  }

  private nfeChaveAcesso({
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

    const nNFFormat = String(nNF).padStart(9, '0')

    const chaveParcial = cUF + AAMM + cnpj + modelo + serie + nNFFormat + tpEmis + cNF;
    const cDV = this.nfeCalcDigitoVerificador(chaveParcial);
    const chave: string = chaveParcial + cDV;

    return chave;
  }

  private nfeCalcDigitoVerificador(chave: string): string {
    if (chave.length > 43) throw new Error(`A chave de acesso tem ${chave.length} mas deveria ter 43 caracteres`)
    try {
      let peso = 2;
      let soma = 0;

      for (let i = chave.length - 1; i >= 0; i--) {
        soma += Number(chave[i]) * peso;
        peso = peso < 9 ? peso + 1 : 2;
      }

      const resto = soma % 11;
      const digito = (resto === 0 || resto === 1) ? 0 : 11 - resto;
      return digito.toString();
    } catch (error) {
      return String(error)
    }
  }

  private nfeCNF() {
    this.cnf = Math.floor(Math.random() * 90000000 + 10000000).toString();
  }

  public toJSON() {
    return {
      NFe: {
        chaveAcesso: this.nfeChaveAcesso,
        ide: this.ide,
        emit: this.emit,
        avulsa: this.avulsa,
        dest: this.dest,
        retirada: this.retirada,
        entrega: this.entrega,
        authXML: this.authXML,
        det: this.det,
        total: this.total,
        transp: this.transp,
        cobr: this.cobr,
        pag: this.pag,
        infIntermed: this.infIntermed,
        infAdic: this.infAdic,
        exporta: this.exporta,
        compra: this.compra,
        cana: this.cana,
        infRespTec: this.infRespTec,
        infSolicNFF: this.infSolicNFF,
        agropecuario: this.agropecuario,
      },
      nfeCNF: this.cnf,
      nfeChaveAcesso: this.chaveAcesso,
      nfeDV: this.nfeDV,
      versao: '4.00',
    }
  }
}
