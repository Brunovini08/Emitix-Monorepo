import { DomainError } from "../errors/domain.error"
import { ConsChNFe } from "../values-objects/nfe-danfe/consChNFe.vo"
import { ConsNSU } from "../values-objects/nfe-danfe/consNSU.vo"
import { DistNSU } from "../values-objects/nfe-danfe/distNSU.vo"

export class NfeDanfeEntity {
    versao: string
    tpAmb: string
    cUFAuto: string
    CNPJ?: string
    CPF?: string
    distNSU: DistNSU
    consNSU: ConsNSU
    consChNFe: ConsChNFe

    constructor(data: {
        versao: string
        tpAmb: string
        cUFAuto: string
        CNPJ?: string
        CPF?: string
        distNSU: DistNSU
        consNSU: ConsNSU
        consChNFe: ConsChNFe
    }) {
        this.versao = data.versao
        this.tpAmb = data.tpAmb
        this.cUFAuto = data.cUFAuto
        this.CNPJ = data.CNPJ
        this.CPF = data.CPF
        this.distNSU = data.distNSU
        this.consNSU = data.consNSU
        this.consChNFe = data.consChNFe
        this.throwOrvalidate()
    }

    private throwOrvalidate () {
        if (!this.versao) throw new DomainError('Versão é obrigatória')
        if (!this.tpAmb) throw new DomainError('tpAmb é obrigatório')
        if (!this.cUFAuto) throw new DomainError('cUFAuto é obrigatório')
        if (!this.distNSU) throw new DomainError('distNSU é obrigatório')
        if (!this.consNSU) throw new DomainError('consNSU é obrigatório')
        if (!this.consChNFe) throw new DomainError('consChNFe é obrigatório')
        if(!this.CNPJ && !this.CPF) throw new DomainError('CNPJ ou CPF é obrigatório')
        if(this.CNPJ && this.CPF) throw new DomainError('CNPJ e CPF não podem ser informados ao mesmo tempo')
        if(this.CNPJ && this.CNPJ.length !== 14) throw new DomainError('CNPJ inválido')
        if(this.CPF && this.CPF.length !== 11) throw new DomainError('CPF inválido')
    }

    public toJSON() {
        const distNSU = {
            ultNSU: this.distNSU.ultNSU
        }
        const consNSU = {
            NSU: this.consNSU.NSU
        }
        const consChNFe = {
            chNFe: this.consChNFe.chNFe
        }
        const distDFeInt = {
            tpAmb: this.tpAmb,
            cUFAuto: this.cUFAuto,
            CNPJ: this.CNPJ ? this.CNPJ: undefined,
            CPF: this.CPF? this.CPF: undefined,
            distNSU: distNSU,
            consNSU: consNSU,
            consChNFe: consChNFe
        }

        return {
            distDFeInt: distDFeInt,
            versao: this.versao
        }
    }
}