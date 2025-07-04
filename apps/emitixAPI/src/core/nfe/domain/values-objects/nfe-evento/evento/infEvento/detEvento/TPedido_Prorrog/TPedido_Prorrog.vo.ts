import { ItemPedidoVO } from "./itemPedido.vo"

export class TPedido_ProrrogVO {
    versao: string
    descEvento: string
    nProt: string
    itemPedido: ItemPedidoVO[]

    constructor(data: {
        versao: string
        descEvento: string
        nProt: string
        itemPedido: ItemPedidoVO[]
    }) {
        this.versao = data.versao
        this.descEvento = data.descEvento
        this.nProt = data.nProt
        this.itemPedido = data.itemPedido
    }
    
    public toJSON() {
        return {
            versao: this.versao,
            descEvento: this.descEvento,
            nProt: this.nProt,
            itemPedido: this.itemPedido.map(item => item.toJSON())
        }
    }
}