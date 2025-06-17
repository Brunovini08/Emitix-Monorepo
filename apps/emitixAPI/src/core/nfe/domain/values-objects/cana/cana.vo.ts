import type { deduc } from "./forDia/deduc.vo"
import type { forDia } from "./forDia/forDia.vo"

export class cana {

  safra
  ref
  forDia: forDia[]
  qTotMes
  qTotAnt
  qTotGer
  deduc: deduc[]
  vFor
  vTotDed
  vLiqFor

  constructor(
    safra,
    ref,
    forDia,
    qTotMes,
    qTotAnt,
    qTotGer,
    deduc,
    vFor,
    vTotDed,
    vLiqFor
  ) {
    this.safra = safra;
    this.ref = ref;
    this.forDia = forDia;
    this.qTotMes = qTotMes;
    this.qTotAnt = qTotAnt;
    this.qTotGer = qTotGer;
    this.deduc = deduc;
    this.vFor = vFor;
    this.vTotDed = vTotDed;
    this.vLiqFor = vLiqFor;
  }

  validateOrThrow() {
    const requiredFields = [
      'safra', 'ref', 'forDia', 'qTotMes', 'qTotAnt',
      'qTotGer', 'deduc', 'vFor', 'vTotDed', 'vLiqFor'
    ];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new Error(`O campo ${field} é obrigatório`);
      }
    }

    if (this.safra !== undefined && this.safra !== null) {
      if (this.safra.length < 4 || this.safra.length > 9) {
        throw new Error('O campo safra deve ter entre 4 e 9 caracteres.');
      }
    }

    if (this.ref !== undefined && this.ref !== null) {
      const refRegex = /^(0[0-9]|1[0-2])([/][2][0-9]{3})$/;
      if (!refRegex.test(this.ref)) {
        throw new Error('O campo ref deve ser no formato MM/AAAA.');
      }
    }

    if (this.forDia !== undefined && this.forDia !== null) {
      if (!Array.isArray(this.forDia)) {
        throw new Error('O campo forDia deve ser um array.');
      }
      if (this.forDia.length < 1 || this.forDia.length > 31) {
        throw new Error('O campo forDia deve ter entre 1 e 31 itens.');
      }
      for (const item of this.forDia) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }

    if (this.qTotMes !== undefined && this.qTotMes !== null) {
      if (typeof this.qTotMes.validateOrThrow === 'function') {
        this.qTotMes.validateOrThrow();
      }
    }

    if (this.qTotAnt !== undefined && this.qTotAnt !== null) {
      if (typeof this.qTotAnt.validateOrThrow === 'function') {
        this.qTotAnt.validateOrThrow();
      }
    }

    if (this.qTotGer !== undefined && this.qTotGer !== null) {
      if (typeof this.qTotGer.validateOrThrow === 'function') {
        this.qTotGer.validateOrThrow();
      }
    }

    if (this.deduc !== undefined && this.deduc !== null) {
      if (!Array.isArray(this.deduc)) {
        throw new Error('O campo deduc deve ser um array.');
      }
      if (this.deduc.length < 0 || this.deduc.length > 10) {
        throw new Error('O campo deduc deve ter entre 0 e 10 itens.');
      }
      for (const item of this.deduc) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }

    if (this.vFor !== undefined && this.vFor !== null) {
      if (typeof this.vFor.validateOrThrow === 'function') {
        this.vFor.validateOrThrow();
      }
    }

    if (this.vTotDed !== undefined && this.vTotDed !== null) {
      if (typeof this.vTotDed.validateOrThrow === 'function') {
        this.vTotDed.validateOrThrow();
      }
    }

    if (this.vLiqFor !== undefined && this.vLiqFor !== null) {
      if (typeof this.vLiqFor.validateOrThrow === 'function') {
        this.vLiqFor.validateOrThrow();
      }
    }
  }

  toJSON() {
    return {
      safra: this.safra,
      ref: this.ref,
      forDia: this.forDia.map(item => item.toJSON()),
      qTotMes: this.qTotMes.toJSON(),
      qTotAnt: this.qTotAnt.toJSON(),
      qTotGer: this.qTotGer.toJSON(),
      deduc: this.deduc.map(item => item.toJSON()),
      vFor: this.vFor.toJSON(),
      vTotDed: this.vTotDed.toJSON(),
      vLiqFor: this.vLiqFor.toJSON(),
    };
  }
}