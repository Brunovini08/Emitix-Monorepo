import { DomainError } from "../errors/domain.error";

export class InutNFe {
  public readonly tpAmb: string;
  public readonly xServ: string;
  public readonly cUF: string;
  public readonly ano: string;
  public readonly CNPJ: string;
  public readonly mod: string;
  public readonly serie: string;
  public readonly nNFIni: string;
  public readonly nNFFin: string;
  public readonly xJust: string;
  public readonly nfeChaveAcesso: string;

  constructor(data: {
    tpAmb: string;
    xServ: string;
    cUF: string;
    ano: string;
    CNPJ: string;
    mod: string;
    serie: string;
    nNFIni: string;
    nNFFin: string;
    xJust: string;
  }) {
    this.tpAmb = data.tpAmb;
    this.xServ = data.xServ;
    this.cUF = data.cUF;
    this.ano = data.ano;
    this.CNPJ = data.CNPJ;
    this.mod = data.mod;
    this.serie = data.serie;
    this.nNFIni = data.nNFIni;
    this.nNFFin = data.nNFFin;
    this.xJust = data.xJust;
    this.validateOrThrow();

    const chaveParcial = this.gerarChaveParcial({
      cUF: this.cUF,
      cnpj: this.CNPJ,
      modelo: this.mod,
      serie: this.serie,
      nNFIni: this.nNFIni,
      nNFFin: this.nNFFin,
      dhEmi: new Date()
    })
    this.nfeChaveAcesso = chaveParcial
    this.validarChaveAcesso(this.nfeChaveAcesso);
  }

  private validarChaveAcesso(chave: string): void {
    if (chave.length !== 41) throw new DomainError(`Chave de acesso deve ter 41 dígitos, mas tem ${chave.length}`);
    if (!/^[0-9]{41}$/.test(chave)) throw new DomainError('Chave de acesso deve conter apenas números');
  }

  public validateOrThrow() {
    if (!this.tpAmb) throw new DomainError('tpAmb é obrigatório');
    if (!this.xServ) throw new DomainError('xServ é obrigatório');
    if (!this.cUF) throw new DomainError('cUF é obrigatório');
    if (!this.ano) throw new DomainError('ano é obrigatório');
    if (!this.CNPJ) throw new DomainError('CNPJ é obrigatório');
    if (!this.mod) throw new DomainError('mod é obrigatório');
    if (!this.serie) throw new DomainError('serie é obrigatório');
    if (!this.nNFIni) throw new DomainError('nNFIni é obrigatório');
    if (!this.nNFFin) throw new DomainError('nNFFin é obrigatório');
    if (!this.xJust) throw new DomainError('xJust é obrigatório');
  }

  private gerarChaveParcial({ cUF, cnpj, modelo, serie, nNFIni, nNFFin, dhEmi }): string {
    const emissionDate = new Date(String(dhEmi));
    const AA = String(emissionDate.getFullYear()).slice(-2);
    const cUFFormat = String(cUF).padStart(2, '0');
    const cnpjFormat = String(cnpj).padStart(14, '0');
    const modeloFormat = String(modelo).padStart(2, '0');
    const serieFormat = String(serie).padStart(3, '0');
    const nNFIniFormat = String(nNFIni).padStart(9, '0');
    const nNFFinFormat = String(nNFFin).padStart(9, '0');

    const chaveParcial = cUFFormat + AA + cnpjFormat + modeloFormat + serieFormat + nNFIniFormat + nNFFinFormat
    if (chaveParcial.length !== 41) {
      throw new DomainError(`Chave parcial deve ter 41 dígitos, mas tem ${chaveParcial.length}`);
    }

    return chaveParcial;
  }

  public toJSON() {
    const inutNfe = {
      tpAmb: this.tpAmb,
      xServ: this.xServ,
      cUF: this.cUF,
      ano: this.ano,
      CNPJ: this.CNPJ,
      mod: this.mod,
      serie: this.serie,
      nNFIni: this.nNFIni,
      nNFFin: this.nNFFin,
      xJust: this.xJust
    };

    return {
      inutNFe: inutNfe,
      nfeChaveAcesso: this.nfeChaveAcesso,
      versao: '4.00'
    }
  }
} 