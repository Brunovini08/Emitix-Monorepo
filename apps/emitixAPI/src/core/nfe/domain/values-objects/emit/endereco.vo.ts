// src/domain/shared/value-objects/endereco.vo.ts

export class Endereco {
  public readonly xLgr: string;    // Logradouro
  public readonly nro: string;     // Número
  public readonly xBairro: string; // Bairro
  public readonly cMun: string;    // Código do Município (IBGE)
  public readonly xMun: string;    // Nome do Município
  public readonly UF: string;      // Sigla da Unidade da Federação
  public readonly CEP: string;     // Código de Endereçamento Postal
  public readonly cPais: string;   // Código do País (1058 para Brasil)
  public readonly xPais: string;   // Nome do País (Brasil)
  public readonly fone?: string;   // Telefone (Opcional)
  public readonly cpl?: string;    // Complemento (Opcional)

  constructor(data: {
    xLgr: string;
    nro: string;
    xBairro: string;
    cMun: string;
    xMun: string;
    UF: string;
    CEP: string;
    cPais: string;
    xPais: string;
    fone?: string;
    cpl?: string;
  }) {
    this.xLgr = data.xLgr;
    this.nro = data.nro;
    this.xBairro = data.xBairro;
    this.cMun = data.cMun;
    this.xMun = data.xMun;
    this.UF = data.UF;
    this.CEP = data.CEP;
    this.cPais = data.cPais;
    this.xPais = data.xPais;
    this.fone = data.fone;
    this.cpl = data.cpl;

    this.validateOrThrow(); // Valida na construção
  }

  /**
   * Valida as regras de negócio para o Value Object Endereco.
   * Lança um erro específico se alguma validação falhar.
   */
  public validateOrThrow(): void {
    if (!this.xLgr || this.xLgr.trim() === '') {
      throw new Error('Logradouro (xLgr) é obrigatório.');
    }
    if (!this.nro || this.nro.trim() === '') {
      throw new Error('Número (nro) é obrigatório.');
    }
    if (!this.xBairro || this.xBairro.trim() === '') {
      throw new Error('Bairro (xBairro) é obrigatório.');
    }
    if (!this.cMun || this.cMun.length !== 7) { // Código de município IBGE tem 7 dígitos
      throw new Error('Código do Município (cMun) inválido. Deve ter 7 dígitos.');
    }
    if (!this.xMun || this.xMun.trim() === '') {
      throw new Error('Nome do Município (xMun) é obrigatório.');
    }
    if (!this.UF || this.UF.length !== 2) {
      throw new Error('UF inválida. Deve ter 2 caracteres.');
    }
    if (!this.CEP || this.CEP.length !== 8) { // CEP sem formatação
      throw new Error('CEP inválido. Deve ter 8 dígitos.');
    }
    if (this.cPais !== '1058' || this.xPais !== 'Brasil') {
        throw new Error('País inválido. Apenas Brasil (código 1058) é permitido.');
    }
    // Adicionar validações de formato para fone, se necessário
  }

  // Você pode adicionar métodos úteis aqui, como formatar CEP, obter cidade/estado, etc.
  public getCepFormatado(): string {
    if (!this.CEP) return '';
    return this.CEP.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  public getFullAddress(): string {
    return `${this.xLgr}, ${this.nro} - ${this.xBairro}, ${this.xMun} - ${this.UF}, CEP ${this.getCepFormatado()}`;
  }
}