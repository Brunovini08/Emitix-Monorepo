import type { ObsContent } from "../det/obsItem/obsCont.vo"
import type { ObsFisco } from "../det/obsItem/obsFisco.vo"
import type { procRef } from "./procRef.vo"

export class infAdic {

  infAdFisco?: string
  infCpl?: string
  obsCont?: ObsContent[]
  obsFisco?: ObsFisco[]
  procRef?: procRef[]

  constructor(
    data: {
      infAdFisco?: string,
      infCpl?: string,
      obsCont?: ObsContent[],
      obsFisco?: ObsFisco[],
      procRef?: procRef[]
    }
  ) {
    this.infAdFisco = data.infAdFisco || undefined;
    this.infCpl = data.infCpl || undefined;
    this.obsCont = data.obsCont || undefined;
    this.obsFisco = data.obsFisco || undefined;
    this.procRef = data.procRef || undefined;
  }

  validateOrThrow() {
    if (this.infAdFisco !== undefined && this.infAdFisco !== null) {
      if (this.infAdFisco.length < 0 || this.infAdFisco.length > 2000) {
        throw new Error('O campo infAdFisco deve ter entre 0 e 2000 caracteres.');
      }
    }

    if (this.infCpl !== undefined && this.infCpl !== null) {
      if (this.infCpl.length < 0 || this.infCpl.length > 5000) {
        throw new Error('O campo infCpl deve ter entre 0 e 5000 caracteres.');
      }
    }

    if (this.obsCont !== undefined && this.obsCont !== null) {
      if (!Array.isArray(this.obsCont)) {
        throw new Error('O campo obsCont deve ser um array.');
      }
      if (this.obsCont.length < 0 || this.obsCont.length > 10) {
        throw new Error('O campo obsCont deve ter entre 0 e 10 itens.');
      }
      for (const item of this.obsCont) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }

    if (this.obsFisco !== undefined && this.obsFisco !== null) {
      if (!Array.isArray(this.obsFisco)) {
        throw new Error('O campo obsFisco deve ser um array.');
      }
      if (this.obsFisco.length < 0 || this.obsFisco.length > 10) {
        throw new Error('O campo obsFisco deve ter entre 0 e 10 itens.');
      }
      for (const item of this.obsFisco) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }

    if (this.procRef !== undefined && this.procRef !== null) {
      if (!Array.isArray(this.procRef)) {
        throw new Error('O campo procRef deve ser um array.');
      }
      if (this.procRef.length < 0 || this.procRef.length > 100) {
        throw new Error('O campo procRef deve ter entre 0 e 100 itens.');
      }
      for (const item of this.procRef) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }
  }

  toJSON() {
    return {
      infAdFisco: this.infAdFisco || undefined,
      infCpl: this.infCpl || undefined,
      obsCont: this.obsCont ? this.obsCont.map(item => item.toJSON()) : undefined,
      obsFisco: this.obsFisco ? this.obsFisco.map(item => item.toJSON()) : undefined,
      procRef: this.procRef ? this.procRef.map(item => item.toJSON()) : undefined,
    };
  }
}