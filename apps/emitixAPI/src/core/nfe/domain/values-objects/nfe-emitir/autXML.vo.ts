import { DomainError } from "../../errors/domain.error";

export class AutXML {
  public readonly CNPJ?: string; 
  public readonly CPF?: string;  

  constructor(data: {
    CNPJ?: string;
    CPF?: string;
  }) {
    this.CNPJ = data.CNPJ;
    this.CPF = data.CPF;

    this.validateOrThrow(); 
  }

  public validateOrThrow(): void {
    const hasCnpj = !!this.CNPJ;
    const hasCpf = !!this.CPF;

    if (!hasCnpj && !hasCpf) {
      throw new DomainError('Pessoa autorizada (autXML) deve ter CNPJ ou CPF.');
    }
    if (hasCnpj && hasCpf) {
      throw new DomainError('Pessoa autorizada (autXML) não pode ter CNPJ e CPF informados simultaneamente.');
    }

    if (hasCnpj && this.CNPJ.length !== 14) {
      throw new DomainError('CNPJ da pessoa autorizada inválido. Deve ter 14 dígitos.');
    }
    if (hasCpf && this.CPF.length !== 11) {
      throw new DomainError('CPF da pessoa autorizada inválido. Deve ter 11 dígitos.');
    }
  }

  public getDocumento(): string {
    return this.CNPJ || this.CPF || '';
  }

  public toJSON() {
    return {
      CNPJ: this.CNPJ || undefined,
      CPF: this.CPF || undefined,
    };
  }
}