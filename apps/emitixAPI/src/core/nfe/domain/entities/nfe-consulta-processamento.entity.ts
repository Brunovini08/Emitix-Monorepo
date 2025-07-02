import { DomainError } from "../errors/domain.error";

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
      throw new DomainError("tpAmb é obrigatório");
    }
    if (!this.nReq) {
      throw new DomainError("nReq é obrigatório");	
    }
    if (!this.versao) {
      throw new DomainError("versao é obrigatório");
    }
    if (!this.cnpj) {
      throw new DomainError("CNPJ é obrigatório");
    }
    if (!this.uf) {
      throw new DomainError("UF é obrigatório");
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