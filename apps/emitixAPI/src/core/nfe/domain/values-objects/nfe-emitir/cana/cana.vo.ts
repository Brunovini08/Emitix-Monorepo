import { DomainError } from "../../../errors/domain.error"
import type { deduc } from "./forDia/deduc.vo"
import type { forDia } from "./forDia/forDia.vo"

export class cana {

  safra: string
  ref: string
  forDia: forDia[]
  qTotMes: number
  qTotAnt: number
  qTotGer: number
  deduc: deduc[]
  vFor: number
  vTotDed: number
  vLiqFor: number

  constructor(
    data: {
      safra: string,
      ref: string,
      forDia: forDia[],
      qTotMes: number,
      qTotAnt: number,
      qTotGer: number,
      deduc: deduc[],
      vFor: number,
      vTotDed: number,
      vLiqFor: number
    }
  ) {
    this.safra = data.safra;
    this.ref = data.ref;
    this.forDia = data.forDia;
    this.qTotMes = data.qTotMes;
    this.qTotAnt = data.qTotAnt;
    this.qTotGer = data.qTotGer;
    this.deduc = data.deduc;
    this.vFor = data.vFor;
    this.vTotDed = data.vTotDed;
    this.vLiqFor = data.vLiqFor;
  }

  validateOrThrow() {
    const requiredFields = [
      'safra', 'ref', 'forDia', 'qTotMes', 'qTotAnt',
      'qTotGer', 'deduc', 'vFor', 'vTotDed', 'vLiqFor'
    ];

    for (const field of requiredFields) {
      if (this[field] === undefined || this[field] === null) {
        throw new DomainError(`O campo ${field} é obrigatório`);
      }
    }

    if (this.safra !== undefined && this.safra !== null) {
      if (this.safra.length < 4 || this.safra.length > 9) {
        throw new DomainError('O campo safra deve ter entre 4 e 9 caracteres.');
      }
    }

    if (this.ref !== undefined && this.ref !== null) {
      const refRegex = /^(0[0-9]|1[0-2])([/][2][0-9]{3})$/;
      if (!refRegex.test(this.ref)) {
        throw new DomainError('O campo ref deve ser no formato MM/AAAA.');
      }
    }

    if (this.forDia !== undefined && this.forDia !== null) {
      if (!Array.isArray(this.forDia)) {
        throw new DomainError('O campo forDia deve ser um array.');
      }
      if (this.forDia.length < 1 || this.forDia.length > 31) {
        throw new DomainError('O campo forDia deve ter entre 1 e 31 itens.');
      }
      for (const item of this.forDia) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }

    if (this.qTotMes !== undefined && this.qTotMes !== null) {
      if (typeof this.qTotMes === 'number') {
        if (this.qTotMes < 0) {
          throw new DomainError('O campo qTotMes deve ser maior que 0.');
        }
      }
    }

    if (this.qTotAnt !== undefined && this.qTotAnt !== null) {
      if (typeof this.qTotAnt === 'number') {
        if (this.qTotAnt < 0) {
          throw new DomainError('O campo qTotAnt deve ser maior que 0.');
        }
      }
    }

    if (this.qTotGer !== undefined && this.qTotGer !== null) {
      if (typeof this.qTotGer === 'number') {
        if (this.qTotGer < 0) {
          throw new DomainError('O campo qTotGer deve ser maior que 0.');
        }
      }
    }

    if (this.deduc !== undefined && this.deduc !== null) {
      if (!Array.isArray(this.deduc)) {
        throw new DomainError('O campo deduc deve ser um array.');
      }
      if (this.deduc.length < 0 || this.deduc.length > 10) {
        throw new DomainError('O campo deduc deve ter entre 0 e 10 itens.');
      }
      for (const item of this.deduc) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }

    if (this.vFor !== undefined && this.vFor !== null) {
      if (typeof this.vFor === 'number') {
        if (this.vFor < 0) {
          throw new DomainError('O campo vFor deve ser maior que 0.');
        }
      }
    }

    if (this.vTotDed !== undefined && this.vTotDed !== null) {
      if (typeof this.vTotDed === 'number') {
        if (this.vTotDed < 0) {
          throw new DomainError('O campo vTotDed deve ser maior que 0.');
        }
      }
    }

    if (this.vLiqFor !== undefined && this.vLiqFor !== null) {
      if (typeof this.vLiqFor === 'number') {
        if (this.vLiqFor < 0) {
          throw new DomainError('O campo vLiqFor deve ser maior que 0.');
        }
      }
    }
  }

  toJSON() {
    return {
      safra: this.safra,
      ref: this.ref,
      forDia: this.forDia.map(item => item.toJSON()),
      qTotMes: this.qTotMes,
      qTotAnt: this.qTotAnt,
      qTotGer: this.qTotGer,
      deduc: this.deduc.map(item => item.toJSON()),
      vFor: this.vFor,
      vTotDed: this.vTotDed,
      vLiqFor: this.vLiqFor,
    };
  }
}