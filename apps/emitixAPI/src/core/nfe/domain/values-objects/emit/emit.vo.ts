// src/domain/nfe/value-objects/nfe-emitente.vo.ts
// Certifique-se de que o caminho para Endereco.vo.ts esteja correto

import { Endereco } from "./endereco.vo";

export class Emit {
  public readonly CNPJ?: string; // CNPJ ou CPF (opcional, pois pode ser um ou outro)
  public readonly CPF?: string;  // CPF
  public readonly xNome: string; // Razão Social ou Nome
  public readonly xFant?: string; // Nome Fantasia (Opcional)
  public readonly enderEmit: Endereco; // Endereço do Emitente
  public readonly IE: string;    // Inscrição Estadual
  public readonly IEST?: string;  // IE do Substituto Tributário (Opcional)
  public readonly IM?: string;    // Inscrição Municipal (Opcional)
  public readonly CNAE?: string;  // CNAE Fiscal (Opcional)
  public readonly CRT: string;   // Código de Regime Tributário

  constructor(data: {
    CNPJ?: string;
    CPF?: string;
    xNome: string;
    xFant?: string;
    enderEmit: Endereco; // Já espera um Endereco VO aqui
    IE: string;
    IEST?: string;
    IM?: string;
    CNAE?: string;
    CRT: string;
  }) {
    this.CNPJ = data.CNPJ;
    this.CPF = data.CPF;
    this.xNome = data.xNome;
    this.xFant = data.xFant;
    this.enderEmit = data.enderEmit;
    this.IE = data.IE;
    this.IEST = data.IEST;
    this.IM = data.IM;
    this.CNAE = data.CNAE;
    this.CRT = data.CRT;

    this.validateOrThrow(); // Valida na construção
  }

  /**
   * Valida as regras de negócio para o Value Object NFeEmitente.
   * Lança um erro específico se alguma validação falhar.
   */
  public validateOrThrow(): void {
    // Deve ter CNPJ ou CPF, mas não ambos
    if (!this.CNPJ && !this.CPF) {
      throw new Error('CNPJ ou CPF do emitente é obrigatório.');
    }
    if (this.CNPJ && this.CPF) {
      throw new Error('Emitente não pode ter CNPJ e CPF informados simultaneamente.');
    }

    // Validação de formato para CNPJ (ex: 14 dígitos)
    if (this.CNPJ && this.CNPJ.length !== 14) {
      throw new Error('CNPJ do emitente inválido. Deve ter 14 dígitos.');
    }
    // Validação de formato para CPF (ex: 11 dígitos)
    if (this.CPF && this.CPF.length !== 11) {
      throw new Error('CPF do emitente inválido. Deve ter 11 dígitos.');
    }

    if (!this.xNome || this.xNome.trim() === '') {
      throw new Error('Nome/Razão Social (xNome) do emitente é obrigatório.');
    }
    if (!this.IE || this.IE.trim() === '') {
      throw new Error('Inscrição Estadual (IE) do emitente é obrigatória.');
    }
    if (!this.CRT || !['1', '2', '3'].includes(this.CRT)) { // Valores válidos para CRT
      throw new Error('CRT do emitente inválido. Deve ser "1", "2" ou "3".');
    }

    // A validação do endereço já ocorre no construtor de Endereco
    // this.enderEmit.validateOrThrow(); // Garante que o VO aninhado também é válido
  }

  public getDocumento(): string {
    return this.CNPJ || this.CPF || '';
  }

  public isSimplesNacional(): boolean {
      return this.CRT === '1'; // Simples Nacional
  }
}