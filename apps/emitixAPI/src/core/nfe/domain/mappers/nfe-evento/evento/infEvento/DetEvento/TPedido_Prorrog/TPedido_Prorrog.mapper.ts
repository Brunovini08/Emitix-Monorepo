import { TPedido_Prorrog } from "src/core/nfe/domain/types/complex_types/TEvento/TPedido_Prorrog/TPedido_Prorrog";
import { TPedido_ProrrogVO } from "src/core/nfe/domain/values-objects/nfe-evento/evento/infEvento/detEvento/TPedido_Prorrog/TPedido_Prorrog.vo";
import { ItemPedidoMapper } from "./ItemPedido.mapper";

export class TPedido_ProrrogMapper {
    static fromDto(data: TPedido_Prorrog): TPedido_ProrrogVO {
        return new TPedido_ProrrogVO({
            descEvento: data.descEvento,
            versao: data.versao,
            itemPedido: data.itemPedido.map((item) => ItemPedidoMapper.fromDto({
                numItem: item.numItem,
                qtdeItem: item.qtdeItem,
            })),
            nProt: data.nProt,
        })
    }
}