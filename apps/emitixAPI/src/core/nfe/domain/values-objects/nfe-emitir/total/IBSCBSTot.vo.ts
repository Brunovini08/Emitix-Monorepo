import { DomainError } from "../../../errors/domain.error";

export class IBSCBSTot {
  vBCIBSCBS: number;
  gIBS?: {
    gIBSUF: {
      vDif: number;
      vDevTrib: number;
      vIBSUF: number;
    };
    gIBSMun: {
      vDif: number;
      vDevTrib: number;
      vIBSMun: number;
    };
    vIBS: number;
    vCredPres: number;
    vCredPresCondSus: number;
  };
  gCBS?: {
    vDif: number;
    vDevTrib: number;
    vCBS: number;
    vCredPres: number;
    vCredPresCondSus: number;
  };

  constructor(
    data: {
      vBCIBSCBS: number;
      gIBS?: {
        gIBSUF: {
          vDif: number;
          vDevTrib: number;
          vIBSUF: number;
        };
        gIBSMun: {
          vDif: number;
          vDevTrib: number;
          vIBSMun: number;
        };
        vIBS: number;
        vCredPres: number;
        vCredPresCondSus: number;
      };
      gCBS?: {
        vDif: number;
        vDevTrib: number;
        vCBS: number;
        vCredPres: number;
        vCredPresCondSus: number;
      };
    }
  ) {
    this.vBCIBSCBS = data.vBCIBSCBS;
    this.gIBS = data.gIBS;
    this.gCBS = data.gCBS;
  }

  validateOrThrow() {
    if (this.vBCIBSCBS === undefined || this.vBCIBSCBS === null) {
      throw new DomainError('O campo vBCIBSCBS é obrigatório');
    }

    if (this.vBCIBSCBS < 0) {
      throw new DomainError('A base de cálculo IBS/CBS não pode ser negativa');
    }

    if (this.gIBS) {
      this.validateIBS();
    }

    if (this.gCBS) {
      this.validateCBS();
    }
  }

  private validateIBS() {
    if (!this.gIBS) return;

    const { gIBSUF, gIBSMun, vIBS, vCredPres, vCredPresCondSus } = this.gIBS;

    // Validar gIBSUF
    if (gIBSUF.vDif < 0) throw new DomainError('vDif do IBS UF não pode ser negativo');
    if (gIBSUF.vDevTrib < 0) throw new DomainError('vDevTrib do IBS UF não pode ser negativo');
    if (gIBSUF.vIBSUF < 0) throw new DomainError('vIBSUF não pode ser negativo');

    // Validar gIBSMun
    if (gIBSMun.vDif < 0) throw new DomainError('vDif do IBS Municipal não pode ser negativo');
    if (gIBSMun.vDevTrib < 0) throw new DomainError('vDevTrib do IBS Municipal não pode ser negativo');
    if (gIBSMun.vIBSMun < 0) throw new DomainError('vIBSMun não pode ser negativo');

    // Validar outros campos
    if (vIBS < 0) throw new DomainError('vIBS não pode ser negativo');
    if (vCredPres < 0) throw new DomainError('vCredPres não pode ser negativo');
    if (vCredPresCondSus < 0) throw new DomainError('vCredPresCondSus não pode ser negativo');
  }

  private validateCBS() {
    if (!this.gCBS) return;

    const { vDif, vDevTrib, vCBS, vCredPres, vCredPresCondSus } = this.gCBS;

    if (vDif < 0) throw new DomainError('vDif da CBS não pode ser negativo');
    if (vDevTrib < 0) throw new DomainError('vDevTrib da CBS não pode ser negativo');
    if (vCBS < 0) throw new DomainError('vCBS não pode ser negativo');
    if (vCredPres < 0) throw new DomainError('vCredPres da CBS não pode ser negativo');
    if (vCredPresCondSus < 0) throw new DomainError('vCredPresCondSus da CBS não pode ser negativo');
  }

  toJSON() {
    return {
      vBCIBSCBS: this.vBCIBSCBS,
      gIBS: this.gIBS,
      gCBS: this.gCBS,
    };
  }
} 