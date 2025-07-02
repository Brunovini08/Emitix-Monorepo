import { DomainError } from "../../../errors/domain.error";
import type { Endereco } from "./enderDest.vo";


export class Dest {
  public readonly CNPJ?: string | undefined;        
  public readonly CPF?: string | undefined;         
  public readonly idEstrangeiro?: string | undefined; 
  public readonly xNome?: string | undefined;       
  public readonly enderDest?: Endereco | undefined; 
  public readonly indIEDest: string;   
  public readonly IE?: string | undefined;          
  public readonly ISUF?: string | undefined;        
  public readonly IM?: string | undefined;          
  public readonly email?: string | undefined;       

  constructor(data: {
    CNPJ?: string | undefined;
    CPF?: string | undefined;
    idEstrangeiro?: string | undefined;
    xNome?: string | undefined;
    enderDest?: Endereco | undefined; 
    indIEDest: string;
    IE?: string | undefined;
    ISUF?: string | undefined;
    IM?: string | undefined;
    email?: string | undefined;
  }) {
    this.CNPJ = data.CNPJ ?? undefined;
    this.CPF = data.CPF ?? undefined;
    this.idEstrangeiro = data.idEstrangeiro ?? undefined;
    this.xNome = data.xNome ?? undefined;
    this.enderDest = data.enderDest ?? undefined;
    this.indIEDest = data.indIEDest;
    this.IE = data.IE ?? undefined;
    this.ISUF = data.ISUF ?? undefined;
    this.IM = data.IM ?? undefined;
    this.email = data.email ?? undefined;

    this.validateOrThrow(); 
  }


  public validateOrThrow(): void {

    const hasCnpj = !!this.CNPJ;
    const hasCpf = !!this.CPF;
    const hasIdEstrangeiro = !!this.idEstrangeiro;

    if (!hasCnpj && !hasCpf && !hasIdEstrangeiro && this.idEstrangeiro === undefined && this.CNPJ === undefined && this.CPF === undefined) {
      throw new DomainError('Destinatário deve ter CNPJ, CPF ou ID Estrangeiro.');
    }
    if (hasCnpj && hasIdEstrangeiro) {
      throw new DomainError('Destinatário não pode ter CNPJ e ID Estrangeiro informados simultaneamente.');
    }
    if (hasCpf && hasIdEstrangeiro) {
      throw new DomainError('Destinatário não pode ter CPF e ID Estrangeiro informados simultaneamente.');
    }
    if (hasCnpj && hasCpf) {
      throw new DomainError('Destinatário não pode ter CNPJ e CPF informados simultaneamente.');
    }
    if (hasCnpj && this.CNPJ.length !== 14) {
      throw new DomainError('CNPJ do destinatário inválido. Deve ter 14 dígitos.');
    }
    if (hasCpf && this.CPF.length !== 11) {
      throw new DomainError('CPF do destinatário inválido. Deve ter 11 dígitos.');
    }
    if (!this.xNome || this.xNome.trim() === '') {
      throw new DomainError('Nome/Razão Social (xNome) do destinatário é obrigatório.');
    }

    if (!['1', '2', '9'].includes(this.indIEDest)) {
      throw new DomainError('Indicador de IE (indIEDest) inválido. Valores permitidos: "1", "2", "9".');
    }

    if (this.indIEDest === '1' && !hasIdEstrangeiro && (!this.IE || this.IE.trim() === '')) {
      throw new DomainError('Inscrição Estadual (IE) é obrigatória para destinatário contribuinte de ICMS (indIEDest = 1).');
    }
    if (this.indIEDest === '9' && this.IE && this.IE.trim() !== '' && this.IE.toUpperCase() !== 'ISENTO') {
        throw new DomainError('Inscrição Estadual (IE) não deve ser informada para destinatário não contribuinte (indIEDest = 9), a menos que seja "ISENTO".');
    }

    if (this.email && !this.isValidEmail(this.email)) {
      throw new DomainError('Email do destinatário inválido.');
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

  toJSON() {
    return {
      dest: {
        CNPJ: this.CNPJ,
        CPF: this.CPF,
        idEstrangeiro: this.idEstrangeiro,
        xNome: this.xNome,
        enderDest: this.enderDest?.toJSON(),
        indIEDest: this.indIEDest,
        IE: this.IE,
        ISUF: this.ISUF,
        IM: this.IM,
        email: this.email,
      }
    }
  }
}