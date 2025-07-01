export class ConsultaProcessamentoNfeEntity {
  tpAmb: string;
  nReq: string;
  versao: string;
  cnpj: string
  uf: string

  constructor(data: { tpAmb: string; nReq: string; versao: string, cnpj: string, uf: string }) {
    this.tpAmb = data.tpAmb;
    this.nReq = data.nReq;
    this.versao = data.versao;
    this.cnpj = data.cnpj;
    this.uf = data.uf;
    this.validateOrThrow();
  }

  private validateOrThrow() {
    if (!this.tpAmb) {
      throw new Error("tpAmb é obrigatório");
    }
    if (!this.nReq) {
      throw new Error("nReq é obrigatório");	
    }
    if (!this.versao) {
      throw new Error("versao é obrigatório");
    }
    if (!this.cnpj) {
      throw new Error("CNPJ é obrigatório");
    }
    if (!this.uf) {
      throw new Error("UF é obrigatório");
    }
  }


  public toJSON() {
    const consReciNFe = {
        tpAmb: this.tpAmb,
        nRec: this.nReq,
      }
      
      return {
        consReciNFe: consReciNFe,
        cnpj: this.cnpj,
        uf: this.uf,
        versao: this.versao
    }
  }
}