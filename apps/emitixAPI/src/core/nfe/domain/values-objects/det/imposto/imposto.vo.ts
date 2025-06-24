// Assuming these classes are defined elsewhere with their own validation and toJSON methods
import { Produto } from "./produto.vo"
import { Servico } from "./servico.vo"
import { COFINS } from "./COFINS/cofins.vo";
import { PIS } from "./PIS/pis.vo";
import { PISST } from "./PISST/pisst.vo";
import { COFINSST } from "./COFINSST/cofinsst.vo";
import { ICMSUFDest } from "./ICMSUFDest/icmsUfDest.vo";

export class Impostos {
  public readonly vTotTrib?: number;
  public readonly produto: Produto;
  public readonly servico: Servico;
  public readonly PIS: PIS;
  public readonly PISST: PISST;
  public readonly COFINS: COFINS;
  public readonly COFINSST: COFINSST;
  public readonly ICMSUFDest: ICMSUFDest;

  constructor(data: {
    vTotTrib: number;
    produto: Produto;
    servico: Servico;
    PIS: PIS;
    PISST: PISST;
    COFINS: COFINS;
    COFINSST: COFINSST;
    ICMSUFDest: ICMSUFDest;
  }) {
    this.vTotTrib = data.vTotTrib   
    this.produto = data.produto   
    this.servico = data.servico;
    this.PIS = data.PIS;
    this.PISST = data.PISST;
    this.COFINS = data.COFINS;
    this.COFINSST = data.COFINSST;
    this.ICMSUFDest = data.ICMSUFDest;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (this.vTotTrib !== null && (typeof this.vTotTrib !== 'number' || this.vTotTrib < 0)) {
      throw new Error('Valor Total dos Tributos (vTotTrib) deve ser um número não negativo, se informado.');
    }

    if (this.produto) {
      this.produto.validateOrThrow();
    }

    if (this.servico) {
      this.servico.validateOrThrow();
    }

    if (this.PIS) {
      this.PIS.validateOrThrow();
    }

    if (this.PISST) {
      this.PISST.validateOrThrow();
    }

    if (this.COFINS) {
      this.COFINS.validateOrThrow();
    }

    if (this.COFINSST) {
      this.COFINSST.validateOrThrow();
    }

    if (this.ICMSUFDest) {
      this.ICMSUFDest.validateOrThrow();
    }

    if (this.produto && this.servico) {
      throw new Error('Impostos pode conter dados de Produto ou Serviço, mas não ambos.');
    }
  }

  public equals(other) {
    if (!(other instanceof Impostos)) {
      return false;
    }
    return (
      this.vTotTrib === other.vTotTrib &&
      (this.produto ? this.produto.equals(other.produto) : this.produto === other.produto) &&
      (this.servico ? this.servico.equals(other.servico) : this.servico === other.servico) &&
      (this.PIS ? this.PIS.equals(other.PIS) : this.PIS === other.PIS) &&
      (this.PISST ? this.PISST.equals(other.PISST) : this.PISST === other.PISST) &&
      (this.COFINS ? this.COFINS.equals(other.COFINS) : this.COFINS === other.COFINS) &&
      (this.COFINSST ? this.COFINSST.equals(other.COFINSST) : this.COFINSST === other.COFINSST) &&
      (this.ICMSUFDest ? this.ICMSUFDest.equals(other.ICMSUFDest) : this.ICMSUFDest === other.ICMSUFDest)
    );
  }

  public toJSON() {
    return {
      vTotTrib: this.vTotTrib,
      produto: this.produto ? this.produto.toJSON() : null,
      servico: this.servico ? this.servico.toJSON() : null,
      PIS: this.PIS ? this.PIS.toJSON() : null,
      PISST: this.PISST ? this.PISST.toJSON() : null,
      COFINS: this.COFINS ? this.COFINS.toJSON() : null,
      COFINSST: this.COFINSST ? this.COFINSST.toJSON() : null,
      ICMSUFDest: this.ICMSUFDest ? this.ICMSUFDest.toJSON() : null,
    };
  }
}