import type { Prod } from "./prod/prod.vo";
import type { Impostos } from "./imposto/imposto.vo";
import type { ImpostoDevol } from "./impostoDevol/impostoDevo.vo";
import type { ObsItem } from "./obsItem/obsItem.vo";

export class Det {
  public readonly prod: Prod;
  public readonly imposto: Impostos;
  public readonly impostoDevol?: ImpostoDevol;
  public readonly infAdProd?: string;
  public readonly obsItem?: ObsItem;

  constructor(data: {
    prod: Prod;
    imposto: Impostos;
    impostoDevol?: ImpostoDevol;  
    infAdProd?: string 
    obsItem?: ObsItem;
  }) {
    this.prod = data.prod 
    this.imposto = data.imposto || undefined
    this.impostoDevol = data.impostoDevol || undefined
    this.infAdProd = data.infAdProd || undefined
    this.obsItem = data.obsItem || undefined

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (!this.prod) {
      throw new Error('Produto (prod) é obrigatório.');
    }
    this.prod.validateOrThrow();

    if (!this.imposto) {
      throw new Error('Tributos incidentes (imposto) são obrigatórios.');
    }
    this.imposto.validateOrThrow();

    if (this.impostoDevol) {
      this.impostoDevol.validateOrThrow();
    }

    if (this.infAdProd !== undefined) {
      if (typeof this.infAdProd !== 'string') {
        throw new Error('Informações Adicionais do Produto (infAdProd) deve ser uma string.');
      }
      if (this.infAdProd.length < 1 || this.infAdProd.length > 500) {
        throw new Error('Informações Adicionais do Produto (infAdProd) deve ter entre 1 e 500 caracteres.');
      }
    }

    if (this.obsItem) {
      this.obsItem.validateOrThrow();
    }
  }

  public equals(other) {
    if (!(other instanceof Det)) {
      return false;
    }
    return (
      (this.prod ? this.prod.equals(other.prod) : this.prod === other.prod) &&
      (this.imposto ? this.imposto.equals(other.imposto) : this.imposto === other.imposto) &&
      (this.impostoDevol ? this.impostoDevol.equals(other.impostoDevol) : this.impostoDevol === other.impostoDevol) &&
      this.infAdProd === other.infAdProd &&
      (this.obsItem ? this.obsItem.equals(other.obsItem) : this.obsItem === other.obsItem)
    );
  }

  public toJSON() {
    return {
      prod: this.prod.toJSON(),
      imposto: this.imposto.toJSON(),
      impostoDevol: this.impostoDevol ? this.impostoDevol.toJSON() : undefined,
      infAdProd: this.infAdProd || undefined,
      obsItem: this.obsItem ? this.obsItem.toJSON() : undefined,
    };
  }
}