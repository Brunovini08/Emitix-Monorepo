import { TCarta_Correcao } from "src/core/nfe/domain/types/complex_types/TEvento/TCarta_Correcao/TCarta_Correcao";
import { TCarta_CorrecaoVO } from "src/core/nfe/domain/values-objects/nfe-evento/evento/infEvento/detEvento/TCarta_Correcao.vo";

export class TCartaCorrecaoMapper {
    static fromDto(data: TCarta_Correcao): TCarta_CorrecaoVO {
        return new TCarta_CorrecaoVO({
            descEvento: data.descEvento,
            versao: data.versao,
            xCondUso: data.xCondUso
        })
    }
}