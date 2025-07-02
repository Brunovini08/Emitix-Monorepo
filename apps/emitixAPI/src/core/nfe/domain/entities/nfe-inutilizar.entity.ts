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
    const digitoVerificador = this.nfeCalcDigitoVerificador(chaveParcial);
    this.nfeChaveAcesso = chaveParcial + digitoVerificador;
    this.validarChaveAcesso(this.nfeChaveAcesso);
  }

  private validarChaveAcesso(chave: string): void {
    if (chave.length !== 44) throw new DomainError(`Chave de acesso deve ter 44 dígitos, mas tem ${chave.length}`);
    if (!/^[0-9]{44}$/.test(chave)) throw new DomainError('Chave de acesso deve conter apenas números');
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
    const AAMM =
      emissionDate.getFullYear().toString().slice(-2) +
      (emissionDate.getMonth() + 1).toString().padStart(2, '0');

    const cUFFormat = String(cUF).padStart(2, '0');
    const cnpjFormat = String(cnpj).padStart(14, '0');
    const modeloFormat = String(modelo).padStart(2, '0');
    const serieFormat = String(serie).padStart(3, '0');
    const nNFIniFormat = String(nNFIni).padStart(9, '0');
    const nNFFinFormat = String(nNFFin).padStart(9, '0');
    const tipo = '2'

    const chaveParcial = cUFFormat + AAMM + cnpjFormat + modeloFormat + serieFormat + nNFIniFormat + nNFFinFormat + tipo;
    if (chaveParcial.length !== 43) {
      throw new DomainError(`Chave parcial deve ter 43 dígitos, mas tem ${chaveParcial.length}`);
    }

    return chaveParcial;
  }

  private nfeCalcDigitoVerificador(chave: string): string {
    if (chave.length !== 43) {
      throw new DomainError(`A chave de acesso deve ter 43 caracteres, mas tem ${chave.length}`);
    }

    let soma = 0;
    let peso = 2;
    for (let i = chave.length - 1; i >= 0; i--) {
      const digito = parseInt(chave[i], 10);
      if (isNaN(digito)) {
        throw new DomainError(`Caractere inválido na posição ${i}: ${chave[i]}`);
      }
      soma += digito * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }

    const resto = soma % 11;
    const digito = (resto === 0 || resto === 1) ? 0 : 11 - resto;
    return digito.toString();
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