import { DomainError } from "src/core/nfe/domain/errors/domain.error";

export class ICMSUFDest {
  public readonly vBCUFDest;
  public readonly vBCFCPUFDest;
  public readonly pFCPUFDest;
  public readonly pICMSUFDest;
  public readonly pICMSInter;
  public readonly pICMSInterPart;
  public readonly vFCPUFDest;
  public readonly vICMSUFDest;
  public readonly vICMSUFRemt;

  constructor(data: { vBCUFDest: number, vBCFCPUFDest: number | null, pFCPUFDest: number | null, pICMSUFDest: number, pICMSInter: string, pICMSInterPart: number, vFCPUFDest: number | null, vICMSUFDest: number, vICMSUFRemt: number }) {
    this.vBCUFDest = data.vBCUFDest;
    this.vBCFCPUFDest = data.vBCFCPUFDest ?? null;
    this.pFCPUFDest = data.pFCPUFDest ?? null;
    this.pICMSUFDest = data.pICMSUFDest;
    this.pICMSInter = data.pICMSInter;
    this.pICMSInterPart = data.pICMSInterPart;
    this.vFCPUFDest = data.vFCPUFDest ?? null;
    this.vICMSUFDest = data.vICMSUFDest;
    this.vICMSUFRemt = data.vICMSUFRemt;

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (typeof this.vBCUFDest !== 'number' || this.vBCUFDest < 0) {
      throw new DomainError('Valor da Base de Cáculo do ICMS na UF do destinatário (vBCUFDest) é obrigatório e deve ser um número não negativo.');
    }

    if (this.vBCFCPUFDest !== null && (typeof this.vBCFCPUFDest !== 'number' || this.vBCFCPUFDest < 0)) {
      throw new DomainError('Valor da Base de Cálculo do FCP na UF do destinatário (vBCFCPUFDest) deve ser um número não negativo, se informado.');
    }

    if (this.pFCPUFDest !== null && (typeof this.pFCPUFDest !== 'number' || this.pFCPUFDest < 0 || this.pFCPUFDest > 100)) {
      throw new DomainError('Percentual adicional FCP (pFCPUFDest) deve ser um número entre 0 e 100, se informado.');
    }

    if (typeof this.pICMSUFDest !== 'number' || this.pICMSUFDest < 0 || this.pICMSUFDest > 100) {
      throw new DomainError('Alíquota adotada nas operações internas na UF do destinatário (pICMSUFDest) é obrigatória e deve ser um número entre 0 e 100.');
    }

    const allowedPICMSInter = ['4.00', '7.00', '12.00'];
    if (typeof this.pICMSInter !== 'string' || !allowedPICMSInter.includes(this.pICMSInter)) {
      throw new DomainError('Alíquota interestadual das UF envolvidas (pICMSInter) é obrigatória e deve ser "4.00", "7.00" ou "12.00".');
    }

    if (typeof this.pICMSInterPart !== 'number' || this.pICMSInterPart < 0 || this.pICMSInterPart > 100) {
      throw new DomainError('Percentual de partilha para a UF do destinatário (pICMSInterPart) é obrigatório e deve ser um número entre 0 e 100.');
    }

    if (this.vFCPUFDest !== null && (typeof this.vFCPUFDest !== 'number' || this.vFCPUFDest < 0)) {
      throw new DomainError('Valor do FCP na UF do destinatário (vFCPUFDest) deve ser um número não negativo, se informado.');
    }

    if (typeof this.vICMSUFDest !== 'number' || this.vICMSUFDest < 0) {
      throw new DomainError('Valor do ICMS de partilha para a UF do destinatário (vICMSUFDest) é obrigatório e deve ser um número não negativo.');
    }

    if (typeof this.vICMSUFRemt !== 'number' || this.vICMSUFRemt < 0) {
      throw new DomainError('Valor do ICMS de partilha para a UF do remetente (vICMSUFRemt) é obrigatório e deve ser um número não negativo.');
    }
  }

  public equals(other) {
    if (!(other instanceof ICMSUFDest)) {
      return false;
    }
    return (
      this.vBCUFDest === other.vBCUFDest &&
      this.vBCFCPUFDest === other.vBCFCPUFDest &&
      this.pFCPUFDest === other.pFCPUFDest &&
      this.pICMSUFDest === other.pICMSUFDest &&
      this.pICMSInter === other.pICMSInter &&
      this.pICMSInterPart === other.pICMSInterPart &&
      this.vFCPUFDest === other.vFCPUFDest &&
      this.vICMSUFDest === other.vICMSUFDest &&
      this.vICMSUFRemt === other.vICMSUFRemt
    );
  }

  public toJSON() {
    return {
      vBCUFDest: this.vBCUFDest,
      vBCFCPUFDest: this.vBCFCPUFDest,
      pFCPUFDest: this.pFCPUFDest,
      pICMSUFDest: this.pICMSUFDest,
      pICMSInter: this.pICMSInter,
      pICMSInterPart: this.pICMSInterPart,
      vFCPUFDest: this.vFCPUFDest,
      vICMSUFDest: this.vICMSUFDest,
      vICMSUFRemt: this.vICMSUFRemt,
    };
  }
}