import { DomainError } from "../errors/domain.error"

export class NfeConsultaStatusEntity {
    versao: string
    tpAmb: string
    cUF: string
    xServ: string

    constructor (data: {
        versao: string
        tpAmb: string
        cUF: string
        xServ: string
    }) {
        this.versao = data.versao
        this.tpAmb = data.tpAmb
        this.cUF = data.cUF
        this.xServ = data.xServ
        this.throwOrvalidate()
    }
    private throwOrvalidate () {
        if (!this.versao) {
            throw new DomainError('Versao é obrigatório')
        }
        if (!this.tpAmb) {
            throw new DomainError('tpAmb é obrigatório')
        }
        if (!this.cUF) {
            throw new DomainError('cUF é obrigatório')
        }
        if (!this.xServ) {
            throw new DomainError('XServ é obrigatório')
        }
        if(this.xServ !== "STATUS") {
            throw new DomainError('XServ deve ser STATUS')
        }
    }

    public toJSON() {
        const consStatServ = {
            tpAmb: this.tpAmb,
            cUF: this.cUF,
            xServ: this.xServ
        }

        return {
            data: {
                consStatServ: consStatServ
            },
            versao: this.versao
        }
    }
}