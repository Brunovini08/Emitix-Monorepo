export default interface ICreateEmission {
  issueId: string
  emissionType: string
  uf: string
  valor: number
  numeroDocumento: string
  chaveAcesso: string
  dataEmissao: Date
  xml: string
  status: string
  pdf: string
}

export enum EmissionType {
  NFE,
  CTE,
  MDF,
}