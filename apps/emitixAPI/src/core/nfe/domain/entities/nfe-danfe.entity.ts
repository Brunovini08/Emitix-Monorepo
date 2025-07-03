import { DomainError } from "../errors/domain.error"
import { ConsChNFe } from "../values-objects/nfe-danfe/consChNFe.vo"
import { ConsNSU } from "../values-objects/nfe-danfe/consNSU.vo"
import { DistNSU } from "../values-objects/nfe-danfe/distNSU.vo"

export class NfeDanfeEntity {
    versao: string
    tpAmb: string
    cUFAutor?: string
    CNPJ?: string
    CPF?: string
    distNSU?: DistNSU
    consNSU?: ConsNSU
    consChNFe?: ConsChNFe

    constructor(data: {
        versao: string
        tpAmb: string
        cUFAutor?: string
        CNPJ?: string
        CPF?: string
        distNSU?: DistNSU
        consNSU?: ConsNSU
        consChNFe?: ConsChNFe
    }) {
        this.versao = data.versao
        this.tpAmb = data.tpAmb
        this.cUFAutor = data.cUFAutor || undefined
        this.CNPJ = data.CNPJ || undefined
        this.CPF = data.CPF || undefined
        this.distNSU = data.distNSU || undefined
        this.consNSU = data.consNSU || undefined
        this.consChNFe = data.consChNFe || undefined
        this.throwOrvalidate()
    }

    private throwOrvalidate() {
        if (!this.versao) throw new DomainError('Versão é obrigatória')
        if (!this.tpAmb) throw new DomainError('tpAmb é obrigatório')
        if (!this.CNPJ && !this.CPF) throw new DomainError('CNPJ ou CPF é obrigatório')
        if (this.CNPJ && this.CPF) throw new DomainError('CNPJ e CPF não podem ser informados ao mesmo tempo')
        if (this.CNPJ && this.CNPJ.length !== 14) throw new DomainError('CNPJ inválido')
        if (this.CPF && this.CPF.length !== 11) throw new DomainError('CPF inválido')
        if (!this.consChNFe && !this.consNSU && !this.distNSU) throw new DomainError('consChNFe, consNSU ou distNSU é obrigatório')
        if (this.consChNFe && this.consNSU) throw new DomainError('consChNFe e consNSU não podem ser informados ao mesmo tempo')
        if (this.consChNFe && this.distNSU) throw new DomainError('consChNFe e distNSU não podem ser informados ao mesmo tempo')
        if (this.consNSU && this.distNSU) throw new DomainError('consNSU e distNSU não podem ser informados ao mesmo tempo')
    }

    private cleanObject(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map((item) => this.cleanObject(item)).filter((item) => item !== null && item !== undefined);
        } else if (obj !== null && typeof obj === 'object') {
            const cleanedObj: any = {};
            for (const key in obj) {
                const cleanedValue = this.cleanObject(obj[key]);
                if (cleanedValue !== null && cleanedValue !== undefined && !(Array.isArray(cleanedValue) && cleanedValue.length === 0)) {
                    cleanedObj[key] = cleanedValue;
                }
            }
            return Object.keys(cleanedObj).length > 0 ? cleanedObj : undefined;
        }
        return obj;
    }

    public toJSON() {
        const distNSU = {
            ultNSU: this.distNSU?.ultNSU
        }
        const consNSU = {
            NSU: this.consNSU?.NSU
        }
        const consChNFe = {
            chNFe: this.consChNFe?.chNFe
        }
        const distDFeInt = {
            tpAmb: this.tpAmb,
            cUFAutor: this.cUFAutor ? this.cUFAutor : undefined,
            CNPJ: this.CNPJ ? this.CNPJ : undefined,
            CPF: this.CPF ? this.CPF : undefined,
            distNSU: distNSU ? distNSU : undefined,
            consNSU: consNSU ? consNSU : undefined,
            consChNFe: consChNFe ? consChNFe : undefined
        }

        return {
            distDFeInt: this.cleanObject(distDFeInt),
            versao: this.versao
        }
    }
}