import { TMani_Dest } from "src/core/nfe/domain/types/complex_types/TEvento/TMani_dest/TMani_Dest";
import { TMani_DestVO } from "src/core/nfe/domain/values-objects/nfe-evento/evento/infEvento/detEvento/TMani_Dest.vo";

export class TMani_DestMapper {
    static fromDto(data: TMani_Dest): TMani_DestVO {
        return new TMani_DestVO({
            versao: data.versao,
            descEvento: data.descEvento,
            xJust: data.xJust ? data.xJust : undefined
        })
    }
}