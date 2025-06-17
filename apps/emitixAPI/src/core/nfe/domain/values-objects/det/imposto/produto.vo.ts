import { ICMS } from './ICMS/ICMS.vo'; 
import { IPI } from './IPI/ipi.vo'; 
import { II } from './II/II.vo';   

export class Produto {
  public readonly ICMS: ICMS;
  public readonly IPI: IPI;
  public readonly II: II;

  constructor(data: {
    ICMS: ICMS;
    IPI: IPI;
    II: II;
  }) {
    this.ICMS = data.ICMS 
    this.IPI = data.IPI 
    this.II = data.II 

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (!this.ICMS) {
      throw new Error('Dados do ICMS (ICMS) são obrigatórios.');
    }
    this.ICMS.validateOrThrow(); 

    if (this.IPI) {
      this.IPI.validateOrThrow(); 
    }

    if (this.II) {
      this.II.validateOrThrow(); 
    }
  }

  public equals(other) {
    if (!(other instanceof Produto)) {
      return false;
    }
    return (
      (this.ICMS ? this.ICMS.equals(other.ICMS) : this.ICMS === other.ICMS) &&
      (this.IPI ? this.IPI.equals(other.IPI) : this.IPI === other.IPI) &&
      (this.II ? this.II.equals(other.II) : this.II === other.II)
    );
  }

  public toJSON() {
    return {
      ICMS: this.ICMS ? this.ICMS.toJSON() : null,
      IPI: this.IPI ? this.IPI.toJSON() : null,
      II: this.II ? this.II.toJSON() : null,
    };
  }
}