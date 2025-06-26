
import { retTransp } from "./retTransp.vo"
import { transporta } from "./transporta.vo"
import type { TVeiculo } from "./tveiculo.vo"
import { veiculoComReboque } from "./veicComReboque.vo"
import type { vol } from "./vol/vol.vo"

export class transp {

  modFrete
  transporta?: transporta
  retTrasp?: retTransp
  veicTransp?: TVeiculo
  reboque?: veiculoComReboque[]
  vagao?: string
  balsa?: string
  vol?: vol[]

  constructor(
    data: {
      modFrete: string,
      transporta?: transporta,
      retTrasp?: retTransp,
      veicTransp?: TVeiculo,
      reboque?: veiculoComReboque[],
      vagao?: string,
      balsa?: string,
      vol?: vol[]
    }
  ) {
    this.modFrete = data.modFrete;
    this.transporta = data.transporta || undefined;
    this.retTrasp = data.retTrasp || undefined;
    this.veicTransp = data.veicTransp || undefined;
    this.reboque = data.reboque || undefined;
    this.vagao = data.vagao || undefined;
    this.balsa = data.balsa || undefined;
    this.vol = data.vol || undefined;
  }

  validateOrThrow() {
    const validModFrete = ['0', '1', '2', '3', '4', '9'];
    if (this.modFrete === undefined || this.modFrete === null || !validModFrete.includes(this.modFrete)) {
      throw new Error(`O campo modFrete deve ser um dos seguintes: ${validModFrete.join(', ')}.`);
    }

    if (this.transporta !== undefined && this.transporta !== null) {
      if (typeof this.transporta.validateOrThrow === 'function') {
        this.transporta.validateOrThrow();
      }
    }

    if (this.retTrasp !== undefined && this.retTrasp !== null) {
      if (typeof this.retTrasp.validateOrThrow === 'function') {
        this.retTrasp.validateOrThrow();
      }
    }

    if (this.veicTransp !== undefined && this.veicTransp !== null) {
      if (typeof this.veicTransp.validateOrThrow === 'function') {
        this.veicTransp.validateOrThrow();
      }
    }

    if (this.reboque !== undefined && this.reboque !== null) {
      for (const item of this.reboque) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }

    if (this.vagao !== undefined && this.vagao !== null) {
      if (this.vagao.length < 1 || this.vagao.length > 20) {
        throw new Error('O campo vagao deve ter entre 1 e 20 caracteres.');
      }
    }

    if (this.balsa !== undefined && this.balsa !== null) {
      if (this.balsa.length < 1 || this.balsa.length > 20) {
        throw new Error('O campo balsa deve ter entre 1 e 20 caracteres.');
      }
    }

    if (this.vol !== undefined && this.vol !== null) {
      if (!Array.isArray(this.vol)) {
        throw new Error('O campo vol deve ser um array.');
      }
      if (this.vol.length < 0 || this.vol.length > 5000) {
        throw new Error('O campo vol deve ter entre 0 e 5000 itens.');
      }
      for (const item of this.vol) {
        if (typeof item.validateOrThrow === 'function') {
          item.validateOrThrow();
        }
      }
    }
  }

  toJSON() {
    return {
      modFrete: this.modFrete,
      transporta: this.transporta ? (typeof this.transporta.toJSON === 'function' ? this.transporta.toJSON() : this.transporta) : undefined,
      retTrasp: this.retTrasp ? (typeof this.retTrasp.toJSON === 'function' ? this.retTrasp.toJSON() : this.retTrasp) : undefined,
      veicTransp: this.veicTransp ? (typeof this.veicTransp.toJSON === 'function' ? this.veicTransp.toJSON() : this.veicTransp) : undefined,
      reboque: this.reboque ? this.reboque.map(item => item.toJSON()) : undefined,
      vagao: this.vagao,
      balsa: this.balsa,
      vol: this.vol ? this.vol.map(item => item.toJSON()) : undefined,
    };
  }
}