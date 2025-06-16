// src/domain/nfe/value-objects/aut-xml.vo.ts

export class AutXML {
  public readonly CNPJ?: string; // CNPJ da pessoa autorizada
  public readonly CPF?: string;  // CPF da pessoa autorizada

  constructor(data: {
    CNPJ?: string;
    CPF?: string;
  }) {
    this.CNPJ = data.CNPJ;
    this.CPF = data.CPF;

    this.validateOrThrow(); // Valida na construção
  }

  /**
   * Valida as regras de negócio para o Value Object AutXML.
   * Lança um erro específico se alguma validação falhar.
   */
  public validateOrThrow(): void {
    // Deve ter CNPJ ou CPF, mas não ambos
    const hasCnpj = !!this.CNPJ;
    const hasCpf = !!this.CPF;

    if (!hasCnpj && !hasCpf) {
      throw new Error('Pessoa autorizada (autXML) deve ter CNPJ ou CPF.');
    }
    if (hasCnpj && hasCpf) {
      throw new Error('Pessoa autorizada (autXML) não pode ter CNPJ e CPF informados simultaneamente.');
    }

    // Validação de formato para CNPJ (14 dígitos)
    if (hasCnpj && this.CNPJ.length !== 14) {
      throw new Error('CNPJ da pessoa autorizada inválido. Deve ter 14 dígitos.');
    }
    // Validação de formato para CPF (11 dígitos)
    if (hasCpf && this.CPF.length !== 11) {
      throw new Error('CPF da pessoa autorizada inválido. Deve ter 11 dígitos.');
    }
  }

  public getDocumento(): string {
    return this.CNPJ || this.CPF || '';
  }
}