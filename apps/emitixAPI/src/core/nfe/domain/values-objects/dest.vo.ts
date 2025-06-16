// src/domain/nfe/value-objects/nfe-destinatario.vo.ts
// Lembre-se de ajustar o caminho para o seu Value Object Endereco

import type { Endereco } from "./emit/endereco.vo";


export class Dest {
  public readonly CNPJ?: string;        // CNPJ do Destinatário (se pessoa jurídica)
  public readonly CPF?: string;         // CPF do Destinatário (se pessoa física)
  public readonly idEstrangeiro?: string; // ID Estrangeiro (se não for brasileiro)
  public readonly xNome: string;       // Razão Social ou Nome do Destinatário
  public readonly enderDest: Endereco; // Endereço do Destinatário (usando o VO Endereco)
  public readonly indIEDest: string;   // Indicador de IE do Destinatário (1=Contribuinte, 2=Isento, 9=Não Contribuinte)
  public readonly IE?: string;          // Inscrição Estadual (Opcional, dependendo de indIEDest)
  public readonly ISUF?: string;        // Inscrição na Suframa (Opcional)
  public readonly IM?: string;          // Inscrição Municipal (Opcional)
  public readonly email?: string;       // Email do Destinatário (Opcional)

  constructor(data: {
    CNPJ?: string;
    CPF?: string;
    idEstrangeiro?: string;
    xNome: string;
    enderDest: Endereco; // Espera uma instância de Endereco VO
    indIEDest: string;
    IE?: string;
    ISUF?: string;
    IM?: string;
    email?: string;
  }) {
    this.CNPJ = data.CNPJ;
    this.CPF = data.CPF;
    this.idEstrangeiro = data.idEstrangeiro;
    this.xNome = data.xNome;
    this.enderDest = data.enderDest;
    this.indIEDest = data.indIEDest;
    this.IE = data.IE;
    this.ISUF = data.ISUF;
    this.IM = data.IM;
    this.email = data.email;

    this.validateOrThrow(); // Valida as regras de negócio na construção
  }

  /**
   * Valida as regras de negócio para o Value Object NFeDestinatario.
   * Lança um erro específico se alguma validação falhar.
   */
  public validateOrThrow(): void {
    // 1. Documento do Destinatário (CNPJ, CPF, idEstrangeiro)
    const hasCnpj = !!this.CNPJ;
    const hasCpf = !!this.CPF;
    const hasIdEstrangeiro = !!this.idEstrangeiro;

    // Deve ter pelo menos um tipo de documento
    if (!hasCnpj && !hasCpf && !hasIdEstrangeiro) {
      throw new Error('Destinatário deve ter CNPJ, CPF ou ID Estrangeiro.');
    }
    // Não pode ter CNPJ e CPF ao mesmo tempo
    if (hasCnpj && hasCpf) {
      throw new Error('Destinatário não pode ter CNPJ e CPF informados simultaneamente.');
    }
    // Formato do CNPJ
    if (hasCnpj && this.CNPJ.length !== 14) {
      throw new Error('CNPJ do destinatário inválido. Deve ter 14 dígitos.');
    }
    // Formato do CPF
    if (hasCpf && this.CPF.length !== 11) {
      throw new Error('CPF do destinatário inválido. Deve ter 11 dígitos.');
    }
    // Validação de xNome
    if (!this.xNome || this.xNome.trim() === '') {
      throw new Error('Nome/Razão Social (xNome) do destinatário é obrigatório.');
    }

    // 2. Validação do Indicador de Inscrição Estadual (indIEDest) e IE
    if (!['1', '2', '9'].includes(this.indIEDest)) {
      throw new Error('Indicador de IE (indIEDest) inválido. Valores permitidos: "1", "2", "9".');
    }

    // Se indIEDest = 1 (Contribuinte ICMS) e não é operação com o exterior, IE é obrigatória
    if (this.indIEDest === '1' && !hasIdEstrangeiro && (!this.IE || this.IE.trim() === '')) {
      throw new Error('Inscrição Estadual (IE) é obrigatória para destinatário contribuinte de ICMS (indIEDest = 1).');
    }
    // Se indIEDest = 2 (Contribuinte Isento de Inscrição no Cadastro de Contribuintes do ICMS), IE pode ou não ser informada
    // Se indIEDest = 9 (Não Contribuinte), IE não deve ser informada (ou deve ser "ISENTO")
    if (this.indIEDest === '9' && this.IE && this.IE.trim() !== '' && this.IE.toUpperCase() !== 'ISENTO') {
        throw new Error('Inscrição Estadual (IE) não deve ser informada para destinatário não contribuinte (indIEDest = 9), a menos que seja "ISENTO".');
    }

    // 3. Validação do Email (se presente)
    if (this.email && !this.isValidEmail(this.email)) {
      throw new Error('Email do destinatário inválido.');
    }

  }

  // Método auxiliar para validação de email
  private isValidEmail(email: string): boolean {
    // Regex simples para validação de email. Pode ser mais complexo se necessário.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public getDocumentoPrincipal(): string {
    return this.CNPJ || this.CPF || this.idEstrangeiro || '';
  }

  public isContribuinteICMS(): boolean {
    return this.indIEDest === '1';
  }
}