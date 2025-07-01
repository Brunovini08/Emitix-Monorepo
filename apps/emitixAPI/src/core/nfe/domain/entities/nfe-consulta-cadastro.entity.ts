import type { InfCons } from "../values-objects/nfe-consulta-cadastro/infCons.vo";

export class NfeConsultaCadastroEntity {
  versao: string;
  infCons: InfCons
  constructor(data: { infCons: InfCons, versao: string }) {
    this.infCons = data.infCons;
    this.versao = data.versao;
  }


  public toJSON() {
    return {
      consultaCadastro: {
        infCons: this.infCons.toJSON()
      },
      versao: this.versao,
    };
  }
}