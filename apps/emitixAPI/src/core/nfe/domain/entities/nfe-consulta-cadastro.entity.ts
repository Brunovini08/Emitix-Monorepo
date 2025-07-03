import type { InfCons } from "../values-objects/nfe-consulta-cadastro/infCons.vo";

export class NfeConsultaCadastroEntity {
  versao: string;
  infCons: InfCons
  constructor(data: { infCons: InfCons, versao: string }) {
    this.infCons = data.infCons;
    this.versao = data.versao;
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


  public toJSON() {


    return {
      ConsCad: this.cleanObject(this.infCons.toJSON()),
      versao: this.versao,
    };
  }
}