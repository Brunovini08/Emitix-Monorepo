import { DomainError } from "../errors/domain.error"

export class NfeConsultaEntity {
  versao: string
  tpAmb: string
  xServ: string
  chNFe: string

  constructor (data: {
    versao: string
    tpAmb: string
    xServ: string
    chNFe: string
  }) {
    this.versao = data.versao
    this.tpAmb = data.tpAmb
    this.xServ = data.xServ
    this.chNFe = data.chNFe

    this.throwOrvalidate()
  }

  private throwOrvalidate (): void {
    if (!this.versao) {
      throw new DomainError('versao é obrigatório')
    }
    if (!this.tpAmb) {
      throw new DomainError('tpAmb (Identificação do Ambiente: 1=Produção/2=Homologação) é obrigatório')
    }
    if (!this.xServ) {
      throw new DomainError('xServ (Serviço Solicitado) é obrigatório')
    }

    if (this.xServ !== 'CONSULTAR') {
      throw new DomainError('xServ deve ser CONSULTAR')
    }
    if (!this.chNFe) {
      throw new DomainError('chNFe (Chave de Acesso) é obrigatório')
    }

    if (this.chNFe.length !== 44) {
      throw new DomainError('chNFe deve ter 44 caracteres')
    }
  }

  public toJSON() {
    const consSitNFe = {
        tpAmb: this.tpAmb,
        xServ: this.xServ,
        chNFe: this.chNFe
    }

    return {
      data: {
        consSitNFe: consSitNFe
      },
      versao: this.versao
    }
  }
}