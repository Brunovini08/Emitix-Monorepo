import { lacres } from "./lacres.vo"

export class vol {

  qVol
  esp
  marca
  nVol
  pesoL
  pesoB
  lacres: lacres

  constructor(
    qVol,
    esp,
    marca,
    nVol,
    pesoL,
    pesoB,
    lacres
  ) {
    this.qVol = qVol;
    this.esp = esp;
    this.marca = marca;
    this.nVol = nVol;
    this.pesoL = pesoL;
    this.pesoB = pesoB;
    this.lacres = lacres;
  }

  validateOrThrow() {
    if (this.qVol !== undefined && this.qVol !== null) {
      const qVolRegex = /^[0-9]{1,15}$/;
      if (!qVolRegex.test(this.qVol)) {
        throw new Error('O campo qVol deve ser um número com 1 a 15 dígitos.');
      }
    }

    if (this.esp !== undefined && this.esp !== null) {
      if (this.esp.length < 1 || this.esp.length > 60) {
        throw new Error('O campo esp deve ter entre 1 e 60 caracteres.');
      }
    }

    if (this.marca !== undefined && this.marca !== null) {
      if (this.marca.length < 1 || this.marca.length > 60) {
        throw new Error('O campo marca deve ter entre 1 e 60 caracteres.');
      }
    }

    if (this.nVol !== undefined && this.nVol !== null) {
      if (this.nVol.length < 1 || this.nVol.length > 60) {
        throw new Error('O campo nVol deve ter entre 1 e 60 caracteres.');
      }
    }

    if (this.lacres !== undefined && this.lacres !== null) {
      this.lacres.validateOrThrow();
    }
  }

  toJson() {
    return {
      qVol: this.qVol,
      esp: this.esp,
      marca: this.marca,
      nVol: this.nVol,
      pesoL: this.pesoL,
      pesoB: this.pesoB,
      lacres: this.lacres.toJson(),
    };
  }
}