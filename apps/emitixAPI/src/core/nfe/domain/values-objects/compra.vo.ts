export class compra {

  xNEmp
  xPed
  xCont

  constructor(
    xNEmp = undefined,
    xPed = undefined,
    xCont = undefined
  ) {
    this.xNEmp = xNEmp;
    this.xPed = xPed;
    this.xCont = xCont;
  }

  validateOrThrow() {
    if (this.xNEmp !== undefined && this.xNEmp !== null) {
      if (this.xNEmp.length < 1 || this.xNEmp.length > 22) {
        throw new Error('O campo xNEmp deve ter entre 1 e 22 caracteres.');
      }
    }

    if (this.xPed !== undefined && this.xPed !== null) {
      if (this.xPed.length < 1 || this.xPed.length > 60) {
        throw new Error('O campo xPed deve ter entre 1 e 60 caracteres.');
      }
    }

    if (this.xCont !== undefined && this.xCont !== null) {
      if (this.xCont.length < 1 || this.xCont.length > 60) {
        throw new Error('O campo xCont deve ter entre 1 e 60 caracteres.');
      }
    }
  }

  toJson() {
    return {
      xNEmp: this.xNEmp,
      xPed: this.xPed,
      xCont: this.xCont,
    };
  }
}