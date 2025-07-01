import { COFINS } from "./COFINS/cofins.vo";
import { PIS } from "./PIS/pis.vo";
import { PISST } from "./PISST/pisst.vo";
import { COFINSST } from "./COFINSST/cofinsst.vo";
import { ICMSUFDest } from "./ICMSUFDest/icmsUfDest.vo";
import type { ICMS } from "./ICMS/ICMS.vo";
import type { IPI } from "./IPI/ipi.vo";
import type { II } from "./II/II.vo";
import type { ISSQN } from "./ISSQN/ISSQN.vo";
import type { IBSCBS } from "./IBSCBS/ibscbs.vo";

export class Impostos {
  public readonly vTotTrib?: string;
  
  // Choice 1: Para produtos (ICMS + IPI + II)
  public readonly ICMS?: ICMS;
  public readonly IPI?: IPI;
  public readonly II?: II;
  
  // Choice 2: Para serviços (ISSQN)
  public readonly ISSQN?: ISSQN;
  
  // Elementos opcionais que podem estar presentes em ambos os choices
  public readonly PIS?: PIS;
  public readonly PISST?: PISST;
  public readonly COFINS?: COFINS;
  public readonly COFINSST?: COFINSST;
  public readonly ICMSUFDest?: ICMSUFDest;
  public readonly IBSCBS?: IBSCBS;

  constructor(data: {
    vTotTrib?: string;
    ICMS?: ICMS;
    IPI?: IPI;
    II?: II;
    ISSQN?: ISSQN;
    PIS?: PIS;
    PISST?: PISST;
    COFINS?: COFINS;
    COFINSST?: COFINSST;
    ICMSUFDest?: ICMSUFDest;
    IBSCBS?: IBSCBS;
  }) {
    this.vTotTrib = data.vTotTrib || undefined;
    this.ICMS = data.ICMS || undefined;
    this.IPI = data.IPI || undefined;
    this.II = data.II || undefined;
    this.ISSQN = data.ISSQN || undefined;
    this.PIS = data.PIS || undefined;
    this.PISST = data.PISST || undefined;
    this.COFINS = data.COFINS || undefined;
    this.COFINSST = data.COFINSST || undefined;
    this.ICMSUFDest = data.ICMSUFDest || undefined;
    this.IBSCBS = data.IBSCBS || undefined;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    // Validar vTotTrib
    if (this.vTotTrib !== undefined && (typeof this.vTotTrib !== 'string' || Number(this.vTotTrib) < 0)) {
      throw new Error('Valor Total dos Tributos (vTotTrib) deve ser um número não negativo, se informado.');
    }

    // Validar choice: ICMS/ISSQN
    if (this.ICMS && this.ISSQN) {
      throw new Error('Impostos pode conter ICMS (produtos) ou ISSQN (serviços), mas não ambos.');
    }

    // Validar que pelo menos um choice está presente
    if (!this.ICMS && !this.ISSQN) {
      throw new Error('Impostos deve conter ICMS (produtos) ou ISSQN (serviços).');
    }

    // Validar IPI (só pode estar presente com ICMS)
    if (this.IPI && !this.ICMS) {
      throw new Error('IPI só pode estar presente quando ICMS está presente.');
    }
    if (this.IPI) {
      this.IPI.validateOrThrow();
    }

    // Validar II (só pode estar presente com ICMS)
    if (this.II && !this.ICMS) {
      throw new Error('II só pode estar presente quando ICMS está presente.');
    }
    if (this.II) {
      this.II.validateOrThrow();
    }

    // Validar ISSQN
    if (this.ISSQN) {
      this.ISSQN.validateOrThrow();
    }

    // Validar outros elementos opcionais
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

    if (this.IBSCBS) {
      this.IBSCBS.validateOrThrow();
    }
  }

  public equals(other: Impostos): boolean {
    if (!(other instanceof Impostos)) {
      return false;
    }
    return (
      this.vTotTrib === other.vTotTrib &&
      (this.ICMS ? this.ICMS.equals(other.ICMS!) : this.ICMS === other.ICMS) &&
      (this.IPI ? this.IPI.equals(other.IPI!) : this.IPI === other.IPI) &&
      (this.II ? this.II.equals(other.II!) : this.II === other.II) &&
      (this.ISSQN ? this.ISSQN.equals(other.ISSQN!) : this.ISSQN === other.ISSQN) &&
      (this.PIS ? this.PIS.equals(other.PIS!) : this.PIS === other.PIS) &&
      (this.PISST ? this.PISST.equals(other.PISST) : this.PISST === other.PISST) &&
      (this.COFINS ? this.COFINS.equals(other.COFINS) : this.COFINS === other.COFINS) &&
      (this.COFINSST ? this.COFINSST.equals(other.COFINSST!) : this.COFINSST === other.COFINSST) &&
      (this.ICMSUFDest ? this.ICMSUFDest.equals(other.ICMSUFDest) : this.ICMSUFDest === other.ICMSUFDest) &&
      (this.IBSCBS ? this.IBSCBS.equals(other.IBSCBS!) : this.IBSCBS === other.IBSCBS)
    );
  }

  public toJSON() {
    const result: any = {};
    
    if (this.vTotTrib) {
      result.vTotTrib = this.vTotTrib;
    }
    
    // Choice 1: Produtos
    if (this.ICMS) {
      result.ICMS = this.ICMS.toJSON();
    }
    
    if (this.IPI) {
      result.IPI = this.IPI.toJSON();
    }
    
    if (this.II) {
      result.II = this.II.toJSON();
    }
    
    // Choice 2: Serviços
    if (this.ISSQN) {
      result.ISSQN = this.ISSQN.toJSON();
    }
    
    // Elementos opcionais
    if (this.PIS) {
      result.PIS = this.PIS.toJSON();
    }
    
    if (this.PISST) {
      result.PISST = this.PISST.toJSON();
    }
    
    if (this.COFINS) {
      result.COFINS = this.COFINS.toJSON();
    }
    
    if (this.COFINSST) {
      result.COFINSST = this.COFINSST.toJSON();
    }
    
    if (this.ICMSUFDest) {
      result.ICMSUFDest = this.ICMSUFDest.toJSON();
    }
    
    if (this.IBSCBS) {
      result.IBSCBS = this.IBSCBS.toJSON();
    }
    
    return result;
  }
}