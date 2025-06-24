import type { Endereco } from "./endereco.vo";

export class Emit {
  public readonly CNPJ?: string;
  public readonly CPF?: string;
  public readonly xNome: string;
  public readonly xFant?: string;
  public readonly enderEmit: Endereco;
  public readonly IE: string;
  public readonly IEST?: string;
  public readonly IM?: string;
  public readonly CNAE?: string;
  public readonly CRT: string;

  constructor(data: {
    CNPJ?: string;
    CPF?: string;
    xNome: string;
    xFant?: string;
    enderEmit: Endereco;
    IE: string;
    IEST?: string;
    IM?: string;
    CNAE?: string;
    CRT: string;
  }) {
    this.CNPJ = data.CNPJ ?? undefined;
    this.CPF = data.CPF ?? undefined;
    this.xNome = data.xNome;
    this.xFant = data.xFant ?? undefined;
    this.enderEmit = data.enderEmit;
    this.IE = data.IE
    this.IEST = data.IEST ?? undefined;
    this.IM = data.IM ?? undefined;
    this.CNAE = data.CNAE ?? undefined;
    this.CRT = data.CRT;

    this.validateOrThrow();
  }

  public validateOrThrow(): void {
    if (!this.CNPJ && !this.CPF) {
      throw new Error('CNPJ ou CPF do emitente é obrigatório.');
    }
    if (this.CNPJ && this.CPF) {
      throw new Error('Emitente não pode ter CNPJ e CPF informados simultaneamente.');
    }

    if (this.CNPJ && this.CNPJ.length !== 14) {
      throw new Error('CNPJ do emitente inválido. Deve ter 14 dígitos.');
    }
    if (this.CPF && this.CPF.length !== 11) {
      throw new Error('CPF do emitente inválido. Deve ter 11 dígitos.');
    }

    if (!this.xNome || this.xNome.trim() === '') {
      throw new Error('Nome/Razão Social (xNome) do emitente é obrigatório.');
    }
    if (!this.IE || this.IE.trim() === '') {
      throw new Error('Inscrição Estadual (IE) do emitente é obrigatória.');
    }
      if (!this.CRT || !['1', '2', '3'].includes(this.CRT)) {
      throw new Error('CRT do emitente inválido. Deve ser "1", "2" ou "3".');
    }

  }

  public getDocumento(): string {
    return this.CNPJ || this.CPF || '';
  }

  public isSimplesNacional(): boolean {
    return this.CRT === '1';
  }

  toJSON() {
    return {
      emit: {
        CNPJ: this.CNPJ,
        CPF: this.CPF,
        xNome: this.xNome,
        xFant: this.xFant,
        enderEmit: this.enderEmit.toJSON(),
        IE: this.IE,
        IEST: this.IEST,
        IM: this.IM,
        CNAE: this.CNAE,
        CRT: this.CRT,
      }
    }
  }
}