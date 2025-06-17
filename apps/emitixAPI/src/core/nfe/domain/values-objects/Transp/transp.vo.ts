import { retTransp } from "./retTransp.vo"
import { transporta } from "./transporta.vo"
import { veiculoComReboque } from "./veicComReboque.vo"
import type { vol } from "./vol/vol.vo"

export class transp {

  modFrete
  transporta: transporta
  retTrasp: retTransp
  veicTransp: veiculoComReboque
  reboque
  vagao: string
  balsa: string
  vol: vol[]

  constructor(
    data: {
      modFrete: string,
      transporta: transporta,
      retTrasp: retTransp,
      veicTransp: veiculoComReboque,
      reboque: veiculoComReboque,
      vagao: string,
      balsa: string,
      vol: vol[]
    }
  ) {
    this.modFrete = data.modFrete;
    this.transporta = data.transporta;
    this.retTrasp = data.retTrasp;
    this.veicTransp = data.veicTransp;
    this.reboque = data.reboque;
    this.vagao = data.vagao;
    this.balsa = data.balsa;
    this.vol = data.vol;
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
      if (typeof this.reboque.validateOrThrow === 'function') {
        this.reboque.validateOrThrow();
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

  toJson() {
    return {
      modFrete: this.modFrete,
      transporta: this.transporta ? (typeof this.transporta.toJson === 'function' ? this.transporta.toJson() : this.transporta) : undefined,
      retTrasp: this.retTrasp ? (typeof this.retTrasp.toJson === 'function' ? this.retTrasp.toJson() : this.retTrasp) : undefined,
      veicTransp: this.veicTransp ? (typeof this.veicTransp.toJson === 'function' ? this.veicTransp.toJson() : this.veicTransp) : undefined,
      reboque: this.reboque ? (typeof this.reboque.toJson === 'function' ? this.reboque.toJson() : this.reboque) : undefined,
      vagao: this.vagao,
      balsa: this.balsa,
      vol: this.vol.map(item => item.toJson()),
    };
  }
}