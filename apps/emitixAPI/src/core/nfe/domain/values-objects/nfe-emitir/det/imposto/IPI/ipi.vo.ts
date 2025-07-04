import { DomainError } from "src/core/nfe/domain/errors/domain.error";
import type { IPINT } from "src/core/nfe/domain/types/complex_types/TIpi/IPINT";
import type { IPITrib } from "src/core/nfe/domain/types/complex_types/TIpi/IPITrib";

export class IPI {
  public CNPJProd?; 
  public cSelo?; 
  public qSelo?;
  public cEnq; 
  public IPITrib;
  public IPINT; 

  constructor(data: {
    CNPJProd?: string
    cSelo?: string
    qSelo?: string
    cEnq: string
    IPITrib: IPITrib
    IPINT: IPINT
  }) {
    this.CNPJProd = data.CNPJProd ?? undefined;
    this.cSelo = data.cSelo ?? undefined;
    this.qSelo = data.qSelo ?? undefined;
    this.cEnq = data.cEnq
    this.IPITrib = data.IPITrib 
    this.IPINT = data.IPINT 

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    
    if (this.cSelo !== undefined) {
      if (typeof this.cSelo !== 'string' || this.cSelo.length < 1 || this.cSelo.length > 60) {
        throw new DomainError('cSelo deve ser uma string com comprimento entre 1 e 60 caracteres, se informado.');
      }
    }

    if (this.qSelo !== undefined) {
      if (typeof this.qSelo !== 'string' || !/^[0-9]{1,12}$/.test(this.qSelo)) {
        throw new DomainError('qSelo deve ser uma string contendo 1 a 12 dígitos, se informado.');
      }
    }

    if (this.cEnq !== undefined) {
      if (typeof this.cEnq !== 'string' || this.cEnq.length < 1 || this.cEnq.length > 3) {
        throw new DomainError('cEnq deve ser uma string com comprimento entre 1 e 3 caracteres');
      }
    } else {
      throw new DomainError('cEnq deve ser informado');
    }

    if (this.IPITrib !== undefined && this.IPINT !== undefined) {
      throw new DomainError('Apenas um dos campos IPITrib ou IPINT deve ser informado, não ambos.');
    }
    if (this.IPITrib === undefined && this.IPINT === undefined) {
      throw new DomainError('Pelo menos um dos campos IPITrib ou IPINT deve ser informado.');
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
      CNPJProd: this.CNPJProd || undefined,
      cSelo: this.cSelo || undefined,
      qSelo: this.qSelo || undefined,
      cEnq: this.cEnq,
      IPITrib: this.IPITrib ? this.IPITrib.toJSON() : undefined,
      IPINT: this.IPINT ? this.IPINT.toJSON() : undefined,
    };
  }
}