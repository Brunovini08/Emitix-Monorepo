import { TItemPedido } from "src/core/nfe/domain/types/complex_types/TEvento/TPedido_Prorrog/TItemPedido";
import { ItemPedidoVO } from "src/core/nfe/domain/values-objects/nfe-evento/evento/infEvento/detEvento/TPedido_Prorrog/itemPedido.vo";

export class ItemPedidoMapper {
    static fromDto(data: TItemPedido): ItemPedidoVO {
        return new ItemPedidoVO({
            numItem: String(data.numItem),
            qtdeItem: String(data.qtdeItem),
        })
    }
}