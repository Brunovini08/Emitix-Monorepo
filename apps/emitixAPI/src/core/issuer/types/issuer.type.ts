export default interface ICreateIssuerInvoice {
  cnpj: string
  razaoSocial: string
  userId: string
}

export interface IIssueInvoice {
  id: string
  cnpj: string
  razaoSocial: string
  userId: string
  emission: object[]
  createdAt: Date
  updatedAt: Date
}