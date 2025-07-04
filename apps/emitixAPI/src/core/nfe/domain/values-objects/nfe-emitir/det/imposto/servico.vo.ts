import { DomainError } from 'src/core/nfe/domain/errors/domain.error';
import { IPI } from './IPI/ipi.vo';
import { ISSQN } from './ISSQN/ISSQN.vo';

export class Servico {
  public readonly IPI: IPI;
  public readonly ISSQN: ISSQN;

  constructor(data: {
    IPI: IPI
    ISSQN: ISSQN
  }) {
    this.IPI = data.IPI 
    this.ISSQN = data.ISSQN 

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (this.IPI) {
      this.IPI.validateOrThrow();
    }

    if (!this.ISSQN) {
      throw new DomainError('O campo ISSQN não pode estar vazio.');
    }
    this.ISSQN.validateOrThrow();
  }

  public equals(other) {
    if (!(other instanceof Servico)) {
      return false;
    }
    return (
      (this.IPI ? this.IPI.equals(other.IPI) : this.IPI === other.IPI) &&
      (this.ISSQN ? this.ISSQN.equals(other.ISSQN) : this.ISSQN === other.ISSQN)
    );
  }

  public toJSON() {
    return {
      IPI: this.IPI ? this.IPI.toJSON() : null,
      ISSQN: this.ISSQN ? this.ISSQN.toJSON() : null,
    };
  }
}