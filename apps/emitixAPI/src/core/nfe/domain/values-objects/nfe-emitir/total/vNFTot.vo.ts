import { DomainError } from "../../../errors/domain.error";

export class vNFTot {
  vNFTot: number;

  constructor(data: { vNFTot: number }) {
    this.vNFTot = data.vNFTot;
  }

  validateOrThrow() {
    if (this.vNFTot === undefined || this.vNFTot === null) {
      throw new DomainError('O campo vNFTot é obrigatório');
    }

    if (this.vNFTot < 0) {
      throw new DomainError('O valor total da NF não pode ser negativo');
    }
  }

  toJSON() {
    return {
      vNFTot: this.vNFTot,
    };
  }
} 