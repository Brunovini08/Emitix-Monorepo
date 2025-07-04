export class ItemPedidoVO {
    numItem: string
    qtdeItem: string

    constructor(data: {
        numItem: string
        qtdeItem: string
    }) {
        this.numItem = data.numItem
        this.qtdeItem = data.qtdeItem
    }

    public toJSON() {
        return {
            numItem: this.numItem,
            qtdeItem: this.qtdeItem
        }
    }
}