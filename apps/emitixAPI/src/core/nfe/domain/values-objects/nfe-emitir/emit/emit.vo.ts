import { DomainError } from "../../../errors/domain.error";
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
    CNPJ?: string | undefined;
    CPF?: string | undefined;
    xNome: string;
    xFant?: string | undefined;
    enderEmit: Endereco;
    IE: string
    IEST?: string | undefined;
    IM?: string | undefined;
    CNAE?: string | undefined;
    CRT: string;
  }) {
    this.CNPJ = data.CNPJ
    this.CPF = data.CPF
    this.xNome = data.xNome;
    this.xFant = data.xFant
    this.enderEmit = data.enderEmit;
    this.IE = data.IE
    this.IEST = data.IEST
    this.IM = data.IM
    this.CNAE = data.CNAE
    this.CRT = data.CRT;

    this.validateOrThrow();
  }

  public validateOrThrow(): void {
    if (!this.CNPJ && !this.CPF) {
      throw new DomainError('CNPJ ou CPF do emitente é obrigatório.');
    }
    if (this.CNPJ && this.CPF) {
      throw new DomainError('Emitente não pode ter CNPJ e CPF informados simultaneamente.');
    }

    if (this.CNPJ && this.CNPJ.length !== 14) {
      throw new DomainError('CNPJ do emitente inválido. Deve ter 14 dígitos.');
    }
    if (this.CPF && this.CPF.length !== 11) {
      throw new DomainError('CPF do emitente inválido. Deve ter 11 dígitos.');
    }

    if (!this.xNome || this.xNome.trim() === '') {
      throw new DomainError('Nome/Razão Social (xNome) do emitente é obrigatório.');
    }
    if (!this.IE || this.IE.trim() === '') {
      throw new DomainError('Inscrição Estadual (IE) do emitente é obrigatória.');
    }
      if (!this.CRT || !['1', '2', '3'].includes(this.CRT)) {
      throw new DomainError('CRT do emitente inválido. Deve ser "1", "2" ou "3".');
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
        CNPJ: this.CNPJ || undefined,
        CPF: this.CPF || undefined,
        xNome: this.xNome,
        xFant: this.xFant || undefined,
        enderEmit: this.enderEmit.toJSON(),
        IE: this.IE,
        IEST: this.IEST || undefined,
        IM: this.IM || undefined,
        CNAE: this.CNAE || undefined,
        CRT: this.CRT,
      }
    }
  }
}