import { DomainError } from "src/core/nfe/domain/errors/domain.error"

export class TDestVO {
    UF: string
    CNPJ?: string
    CPF?: string
    idEstrangeiro?: string
    IE?: string
    vNF: string
    vICMS: string
    vST: string

    constructor(data: {
        UF: string
        CNPJ?: string
        CPF?: string
        idEstrangeiro?: string
        IE?: string
        vNF: string
        vICMS: string
        vST: string
    }) {
        this.UF = data.UF
        this.CNPJ = data.CNPJ ? data.CNPJ : undefined
        this.CPF = data.CPF ? data.CPF : undefined
        this.idEstrangeiro = data.idEstrangeiro ? data.idEstrangeiro : undefined
        this.IE = data.IE ? data.IE : undefined
        this.vNF = data.vNF
        this.vICMS = data.vICMS
        this.vST = data.vST
        this.validateOrThrow()
    }

    private validateOrThrow() {
        if (this.UF.length !== 2) {
            throw new DomainError('UF deve conter 2 caracteres')
        }
        if (this.CNPJ && this.CNPJ.length!== 14) {
            throw new DomainError('CNPJ deve conter 14 caracteres')
        }
        if (this.CPF && this.CPF.length!== 11) {
            throw new DomainError('CPF deve conter 11 caracteres')
        }
        if (this.idEstrangeiro && this.idEstrangeiro.length!== 20) {
            throw new DomainError('idEstrangeiro deve conter 20 caracteres')
        }
        if (this.IE && this.IE.length!== 14) {
            throw new DomainError('IE deve conter 14 caracteres')
        }
        if(this.CNPJ && this.CPF) {
            throw new DomainError('CNPJ e CPF não podem ser informados ao mesmo tempo')
        }
        if(this.CNPJ && this.idEstrangeiro) {
            throw new DomainError('CNPJ e idEstrangeiro não podem ser informados ao mesmo tempo')
        }
        if (this.vNF.length!== 13) {
            throw new DomainError('vNF deve conter 13 caracteres')
        }
        if (this.vICMS.length!== 13) {
            throw new DomainError('vICMS deve conter 13 caracteres')
        }
        if (this.vST.length!== 13) {
            throw new DomainError('vST deve conter 13 caracteres')
        }
    }

    public toJSON() {
        return {
            UF: this.UF,
            CNPJ: this.CNPJ ? this.CNPJ : undefined,
            CPF: this.CPF ? this.CPF : undefined,
            idEstrangeiro: this.idEstrangeiro ? this.idEstrangeiro : undefined,
            IE: this.IE ? this.IE : undefined,
            vNF: this.vNF,
            vICMS: this.vICMS,
            vST: this.vST
        }
    }
}