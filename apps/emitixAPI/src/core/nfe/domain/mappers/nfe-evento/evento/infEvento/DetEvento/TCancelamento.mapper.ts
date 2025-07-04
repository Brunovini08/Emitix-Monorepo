import { TCancelamento } from "src/core/nfe/domain/types/complex_types/TEvento/TCancelamento/TCancelamento";
import { TCancelamentoVO } from "src/core/nfe/domain/values-objects/nfe-evento/evento/infEvento/detEvento/TCancelamento.vo";

export class TCancelamentoMapper {
    static fromDto(data: TCancelamento): TCancelamentoVO {
        return new TCancelamentoVO({
            descEvento: data.descEvento,
            nProt: data.nProt,
            xJust: data.xJust
        })
    }
}