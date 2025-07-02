import { DomainError } from "../../errors/domain.error";

export class compra {

  xNEmp: string
  xPed: string
  xCont: string

  constructor(
    data: {
      xNEmp: string,
      xPed: string,
      xCont: string
    }
  ) {
    this.xNEmp = data.xNEmp;
    this.xPed = data.xPed;
    this.xCont = data.xCont;
  }

  validateOrThrow() {
    if (this.xNEmp !== undefined && this.xNEmp !== null) {
      if (this.xNEmp.length < 1 || this.xNEmp.length > 22) {
        throw new DomainError('O campo xNEmp deve ter entre 1 e 22 caracteres.');
      }
    }

    if (this.xPed !== undefined && this.xPed !== null) {
      if (this.xPed.length < 1 || this.xPed.length > 60) {
        throw new DomainError('O campo xPed deve ter entre 1 e 60 caracteres.');
      }
    }

    if (this.xCont !== undefined && this.xCont !== null) {
      if (this.xCont.length < 1 || this.xCont.length > 60) {
        throw new DomainError('O campo xCont deve ter entre 1 e 60 caracteres.');
      }
    }
  }

  toJSON() {
    return {
      xNEmp: this.xNEmp,
      xPed: this.xPed,
      xCont: this.xCont,
    };
  }
}