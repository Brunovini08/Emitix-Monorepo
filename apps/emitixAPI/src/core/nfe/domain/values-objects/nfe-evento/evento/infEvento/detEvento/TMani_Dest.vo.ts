export class TMani_DestVO {
    versao: string
    descEvento: string
    xJust?: string

    constructor(data: {
        versao: string
        descEvento: string
        xJust?: string
    }) {
        this.versao = data.versao
        this.descEvento = data.descEvento
        this.xJust = data.xJust || undefined
    }

    public toJSON() {
        return {
            versao: this.versao,
            descEvento: this.descEvento,
            xJust: this.xJust ? this.xJust : undefined
        }
    }
}