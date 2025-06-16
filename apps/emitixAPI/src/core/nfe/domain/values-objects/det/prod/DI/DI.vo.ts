import type { Adi } from "./adi.vo";

export class DI {
  public readonly nDI: string;
  public readonly dDI: string;
  public readonly xLocDesemb: string;
  public readonly cUFDesemb: string;
  public readonly dDesemb: string;
  public readonly tpViaTransp: string | null;
  public readonly vAFRMM: number | null;
  public readonly tpIntermedio: string | null;
  public readonly CNPJ?: string | null;
  public readonly CPF?: string |null
  public readonly UFTerceiro?: string | null
  public readonly cExportador?: string | null
  public readonly adi?: Adi[]
  public readonly uF: string | null;
  public readonly cEAN: string | null;

  constructor(data: {
    nDI: string;
    dDI: string;
    xLocDesemb: string;
    cUFDesemb: string;
    dDesemb: string;
    tpViaTransp?: string;
    vAFRMM?: number;
    tpIntermedio?: string;
    cNPJ?: string;
    uF?: string;
    cEAN?: string;
  }) {
    this.nDI = data.nDI;
    this.dDI = data.dDI;
    this.xLocDesemb = data.xLocDesemb;
    this.cUFDesemb = data.cUFDesemb;
    this.dDesemb = data.dDesemb;
    this.tpViaTransp = data.tpViaTransp ?? null;
    this.vAFRMM = data.vAFRMM ?? null;
    this.tpIntermedio = data.tpIntermedio ?? null;
    this.CNPJ = data.cNPJ ?? null;
    this.uF = data.uF ?? null;
    this.cEAN = data.cEAN ?? null;

    this.validateOrThrow();
  }

  public validateOrThrow(): void {
    if (!this.nDI || this.nDI.trim() === '') {
      throw new Error('Número da Declaração de Importação (nDI) é obrigatório.');
    }
    if (!this.dDI || !/^\d{4}-\d{2}-\d{2}$/.test(this.dDI)) {
      throw new Error('Data de Registro da DI (dDI) é obrigatória e deve estar no formato AAAA-MM-DD.');
    }
    if (!this.xLocDesemb || this.xLocDesemb.trim() === '') {
      throw new Error('Local de Desembaraço (xLocDesemb) é obrigatório.');
    }
    if (!this.cUFDesemb || this.cUFDesemb.trim() === '') {
      throw new Error('UF de Desembaraço (cUFDesemb) é obrigatória.');
    }
    if (!this.dDesemb || !/^\d{4}-\d{2}-\d{2}$/.test(this.dDesemb)) {
      throw new Error('Data do Desembaraço (dDesemb) é obrigatória e deve estar no formato AAAA-MM-DD.');
    }
    if (this.CNPJ && !/^\d{14}$/.test(this.CNPJ)) {
      throw new Error('CNPJ do adquirente ou encomendante (CNPJ) deve conter exatamente 14 dígitos.');
    }
    if (this.uF && !/^[A-Z]{2}$/.test(this.uF)) {
      throw new Error('UF do adquirente ou encomendante (uF) deve conter exatamente 2 letras maiúsculas.');
    }
    if (this.vAFRMM !== null && typeof this.vAFRMM !== 'number' || (this.vAFRMM !== null && this.vAFRMM < 0)) {
        throw new Error('Valor Adicional ao Frete (vAFRMM) deve ser um número não negativo.');
    }
  }

  public equals(other: DI): boolean {
    if (!(other instanceof DI)) {
      return false;
    }
    return (
      this.nDI === other.nDI &&
      this.dDI === other.dDI &&
      this.xLocDesemb === other.xLocDesemb &&
      this.cUFDesemb === other.cUFDesemb &&
      this.dDesemb === other.dDesemb &&
      this.tpViaTransp === other.tpViaTransp &&
      this.vAFRMM === other.vAFRMM &&
      this.tpIntermedio === other.tpIntermedio &&
      this.CNPJ === other.CNPJ &&
      this.uF === other.uF &&
      this.cEAN === other.cEAN
    );
  }

  public toJSON() {
    return {
      nDI: this.nDI,
      dDI: this.dDI,
      xLocDesemb: this.xLocDesemb,
      cUFDesemb: this.cUFDesemb,
      dDesemb: this.dDesemb,
      tpViaTransp: this.tpViaTransp,
      vAFRMM: this.vAFRMM,
      tpIntermedio: this.tpIntermedio,
      CNPJ: this.CNPJ,
      uF: this.uF,
      cEAN: this.cEAN,
    };
  }
}