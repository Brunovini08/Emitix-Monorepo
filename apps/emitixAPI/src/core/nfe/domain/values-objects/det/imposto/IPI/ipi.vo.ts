import type { IPINT } from "src/core/nfe/domain/types/complex_types/TIpi/IPINT";
import type { IPITrib } from "src/core/nfe/domain/types/complex_types/TIpi/IPITrib";

export class IPI {
  public CNPJProd; 
  public cSelo; 
  public qSelo;
  public cEnq; 
  public IPITrib;
  public IPINT; 

  constructor(data: {
    CNPJProd: string
    cSelo: string
    qSelo: string
    cEnq: string
    IPITrib: IPITrib
    IPINT: IPINT
  }) {
    this.CNPJProd = data.CNPJProd ?? null;
    this.cSelo = data.cSelo ?? null;
    this.qSelo = data.qSelo ?? null;
    this.cEnq = data.cEnq ?? null;
    this.IPITrib = data.IPITrib ?? null;
    this.IPINT = data.IPINT ?? null;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    
    if (this.cSelo !== null) {
      if (typeof this.cSelo !== 'string' || this.cSelo.length < 1 || this.cSelo.length > 60) {
        throw new Error('cSelo must be a string with length between 1 and 60 characters, if informed.');
      }
    }

    if (this.qSelo !== null) {
      if (typeof this.qSelo !== 'string' || !/^[0-9]{1,12}$/.test(this.qSelo)) {
        throw new Error('qSelo must be a string containing 1 to 12 digits, if informed.');
      }
    }

    if (this.cEnq !== null) {
      if (typeof this.cEnq !== 'string' || this.cEnq.length < 1 || this.cEnq.length > 3) {
        throw new Error('cEnq must be a string with length between 1 and 3 characters, if informed.');
      }
    }

    if (this.IPITrib !== null && this.IPINT !== null) {
      throw new Error('Only one of IPITrib or IPINT should be provided, not both.');
    }
    if (this.IPITrib === null && this.IPINT === null) {
      throw new Error('At least one of IPITrib or IPINT must be provided.');
    }
  }

  public equals(other) {
    if (!(other instanceof IPI)) {
      return false;
    }
    return (
      this.CNPJProd === other.CNPJProd &&
      this.cSelo === other.cSelo &&
      this.qSelo === other.qSelo &&
      this.cEnq === other.cEnq &&
      (this.IPITrib === other.IPITrib || (this.IPITrib && other.IPITrib && this.IPITrib.equals(other.IPITrib))) &&
      (this.IPINT === other.IPINT || (this.IPINT && other.IPINT && this.IPINT.equals(other.IPINT)))
    );
  }

  public toJSON() {
    return {
      CNPJProd: this.CNPJProd,
      cSelo: this.cSelo,
      qSelo: this.qSelo,
      cEnq: this.cEnq,
      IPITrib: this.IPITrib ? this.IPITrib.toJSON() : null,
      IPINT: this.IPINT ? this.IPINT.toJSON() : null,
    };
  }
}