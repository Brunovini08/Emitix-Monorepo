import { DomainError } from "src/core/nfe/domain/errors/domain.error"
import { DetEvento } from "./detEvento/detEvento.vo"

export class InfEventoVO {
  cOrgao: string
  tpAmb: string
  CNPJ?: string | undefined
  CPF?: string | undefined
  chNFe: string
  dhEvento: string
  tpEvento: string
  nSeqEvento: string
  verEvento: string
  detEvento: DetEvento
  constructor(data: {
    cOrgao: string
    tpAmb: string
    CNPJ?: string
    CPF?: string
    chNFe: string
    dhEvento: string
    tpEvento: string
    nSeqEvento: string
    verEvento: string
    detEvento: DetEvento
  }) {
    this.cOrgao = data.cOrgao
    this.tpAmb = data.tpAmb
    this.CNPJ = data.CNPJ || undefined
    this.CPF = data.CPF || undefined
    this.chNFe = data.chNFe
    this.dhEvento = data.dhEvento
    this.tpEvento = data.tpEvento
    this.nSeqEvento = data.nSeqEvento
    this.verEvento = data.verEvento
    this.detEvento = data.detEvento
    this.validateOrThrow()
  }

  private validateOrThrow() {
    if (this.CNPJ && this.CPF) {
      throw new DomainError('CNPJ e CPF não podem ser definidos ao mesmo tempo')
    }
    if (!this.CNPJ && !this.CPF) {
      throw new DomainError('CNPJ ou CPF deve ser definido')
    }
    if (this.CNPJ && this.CNPJ.length !== 14) {
      throw new DomainError('CNPJ deve ter 14 caracteres')
    }
    if (this.CPF && this.CPF.length!== 11) {
      throw new DomainError('CPF deve ter 11 caracteres')
    }
  }

  public toJSON() {
    return {
      cOrgao: this.cOrgao,
      tpAmb: this.tpAmb,
      CNPJ: this.CNPJ ? this.CNPJ : undefined,
      CPF: this.CPF ? this.CPF : undefined,
      chNFe: this.chNFe,
      dhEvento: this.dhEvento,
      tpEvento: this.tpEvento,
      nSeqEvento: this.nSeqEvento,
      verEvento: this.verEvento,
      detEvento: this.detEvento.toJSON()
    }
  }
}