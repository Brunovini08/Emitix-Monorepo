
import type { Endereco } from "./emit/endereco.vo";


export class Dest {
  public readonly CNPJ?: string;        
  public readonly CPF?: string;         
  public readonly idEstrangeiro?: string; 
  public readonly xNome: string;       
  public readonly enderDest: Endereco; 
  public readonly indIEDest: string;   
  public readonly IE?: string;          
  public readonly ISUF?: string;        
  public readonly IM?: string;          
  public readonly email?: string;       

  constructor(data: {
    CNPJ?: string;
    CPF?: string;
    idEstrangeiro?: string;
    xNome: string;
    enderDest: Endereco; 
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

    this.validateOrThrow(); 
  }


  public validateOrThrow(): void {

    const hasCnpj = !!this.CNPJ;
    const hasCpf = !!this.CPF;
    const hasIdEstrangeiro = !!this.idEstrangeiro;

    if (!hasCnpj && !hasCpf && !hasIdEstrangeiro) {
      throw new Error('Destinatário deve ter CNPJ, CPF ou ID Estrangeiro.');
    }
    if (hasCnpj && hasCpf) {
      throw new Error('Destinatário não pode ter CNPJ e CPF informados simultaneamente.');
    }
    if (hasCnpj && this.CNPJ.length !== 14) {
      throw new Error('CNPJ do destinatário inválido. Deve ter 14 dígitos.');
    }
    if (hasCpf && this.CPF.length !== 11) {
      throw new Error('CPF do destinatário inválido. Deve ter 11 dígitos.');
    }
    if (!this.xNome || this.xNome.trim() === '') {
      throw new Error('Nome/Razão Social (xNome) do destinatário é obrigatório.');
    }

    if (!['1', '2', '9'].includes(this.indIEDest)) {
      throw new Error('Indicador de IE (indIEDest) inválido. Valores permitidos: "1", "2", "9".');
    }

    if (this.indIEDest === '1' && !hasIdEstrangeiro && (!this.IE || this.IE.trim() === '')) {
      throw new Error('Inscrição Estadual (IE) é obrigatória para destinatário contribuinte de ICMS (indIEDest = 1).');
    }
    if (this.indIEDest === '9' && this.IE && this.IE.trim() !== '' && this.IE.toUpperCase() !== 'ISENTO') {
        throw new Error('Inscrição Estadual (IE) não deve ser informada para destinatário não contribuinte (indIEDest = 9), a menos que seja "ISENTO".');
    }

    if (this.email && !this.isValidEmail(this.email)) {
      throw new Error('Email do destinatário inválido.');
    }

  }

  private isValidEmail(email: string): boolean {
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