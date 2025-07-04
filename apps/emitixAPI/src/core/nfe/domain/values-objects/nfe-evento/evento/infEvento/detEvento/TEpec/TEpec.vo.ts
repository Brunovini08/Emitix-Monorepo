import { DomainError } from "src/core/nfe/domain/errors/domain.error"
import { TDestVO } from "./TDest.vo"

export class TEpecVO {
    versao: string
    descEvento: string
    cOrgaoAutor: string
    tpAutor: string
    verAplic: string
    dhEmi: string
    tpNF: string
    IE: string
    dest: TDestVO

    constructor(data: {
        versao: string
        descEvento: string
        cOrgaoAutor: string
        tpAutor: string
        verAplic: string
        dhEmi: string
        tpNF: string
        IE: string
        dest: TDestVO
    }) {
        this.versao = data.versao
        this.descEvento = data.descEvento
        this.cOrgaoAutor = data.cOrgaoAutor
        this.tpAutor = data.tpAutor
        this.verAplic = data.verAplic
        this.dhEmi = data.dhEmi
        this.tpNF = data.tpNF
        this.IE = data.IE
        this.dest = data.dest
        this.validateOrThrow()
    }

    private validateOrThrow() {
        if (!this.versao) {
            throw new DomainError('O atributo versao é obrigatório')
        }
        if (!this.descEvento) {
            throw new DomainError('O elemento descEvento é obrigatório')
        }
        if (this.descEvento !== 'EPEC') {
            throw new DomainError('O valor do elemento descEvento = EPEC')
        }
        if (this.descEvento.length !== 4) {
            throw new DomainError('O elemento EPEC contém 4 caracteres')
        }
        if (!this.cOrgaoAutor) {
            throw new DomainError('O atributo cOrgaoAutor é obrigatório')
        }
        if (!this.tpAutor) {
            throw new DomainError('O atributo tpAutor é obrigatório')
        }
        if (!this.verAplic) {
            throw new DomainError('O atributo verAplic é obrigatório')
        }
        if (!this.dhEmi) {
            throw new DomainError('O atributo dhEmi é obrigatório')
        }
        if (!this.tpNF) {
            throw new DomainError('O atributo tpNF é obrigatório')
        }
        if (!this.IE) {
            throw new DomainError('O atributo IE é obrigatório')
        }
        if (!this.dest) {
            throw new DomainError('O atributo dest é obrigatório')
        }
    }

    public toJSON() {
        return {
            versao: this.versao,
            descEvento: this.descEvento,
            cOrgaoAutor: this.cOrgaoAutor,
            tpAutor: this.tpAutor,
            verAplic: this.verAplic,
            dhEmi: this.dhEmi,
            tpNF: this.tpNF,
            IE: this.IE,
            dest: this.dest.toJSON()
        }
    }
}