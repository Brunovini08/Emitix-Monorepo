import type { TInfRespTec } from "./TInfRespTec.vo";

export class infRespTec {

  infResTec: TInfRespTec

  constructor(
    infResTec
  ) {
    this.infResTec = infResTec;
  }

  validateOrThrow() {
    if (this.infResTec !== undefined && this.infResTec !== null) {
      if (typeof this.infResTec.validateOrThrow === 'function') {
        this.infResTec.validateOrThrow();
      }
    }
  }

  toJSON() {
    return {
      infResTec: this.infResTec.toJSON()
    };
  }
}