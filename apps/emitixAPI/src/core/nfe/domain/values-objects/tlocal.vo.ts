import type { Endereco } from "./emit/endereco.vo";

export class TLocal implements Endereco{
  public readonly xLgr: string;
  public readonly nro: string;
  public readonly xBairro: string;
  public readonly cMun: string;
  public readonly xMun: string;
  public readonly UF: string;
  public readonly CEP: string;
  public readonly cPais: string;
  public readonly xPais: string;
  public readonly fone?: string | undefined;
  public readonly cpl?: string | undefined;
  public readonly CPF?: string | undefined;
  public readonly CNPJ?: string | undefined;

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
    CNPJ?: string;
    CPF?: string;
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
    this.CNPJ = data.CNPJ;
    this.CPF = data.CPF

    this.validateOrThrow(); // Valida na construção
  }

  public validateOrThrow(): void {

    const hasCNPJ = !!this.CNPJ
    const hasCPF = !!this.CPF

    if(!hasCNPJ && !hasCPF) {
      throw new Error('CNPJ ou CPF é obrigatório')
    }

    if(hasCNPJ && hasCPF) {
      throw new Error('Identificação do local não pode ter CNPJ e CPF informador simultaneamente')
    }

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