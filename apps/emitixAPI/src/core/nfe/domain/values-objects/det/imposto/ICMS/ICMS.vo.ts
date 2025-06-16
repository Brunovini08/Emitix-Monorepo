import type { ICMS00 } from "./ICMS00.vo"
import type { ICMS02 } from "./ICMS02.vo"
import type { ICMS10 } from "./ICMS10.vo"
import type { ICMSSN101 } from "./ICMS101.vo"
import type { ICMS15 } from "./ICMS15.vo"
import type { ICMS20 } from "./ICMS20.vo"
import type { ICMSSN201 } from "./ICMS201.vo"
import type { ICMSSN202 } from "./ICMS202.vo"
import type { ICMS30 } from "./ICMS30.vo"
import type { ICMS40 } from "./ICMS40.vo"
import type { ICMS51 } from "./ICMS51.vo"
import type { ICMS53 } from "./ICMS53.vo"
import type { ICMS60 } from "./ICMS60.vo"
import type { ICMS61 } from "./ICMS61.vo"
import type { ICMS70 } from "./ICMS70.vo"
import type { ICMS90 } from "./ICMS90.vo"
import type { ICMSSN900 } from "./ICMS900.vo"
import type { ICMSPart } from "./ICMSPART.vo"
import type { ICMSSN102 } from "./ICMSSN102.vo"
import type { ICMSSN500 } from "./ICMSSN500.vo"
import type { ICMSST } from "./ICMSST.vo"

export class ICMS {
  public readonly ICMS00?: ICMS00
  public readonly ICMS02?: ICMS02
  public readonly ICMS10?: ICMS10
  public readonly ICMS15?: ICMS15
  public readonly ICMS20?: ICMS20
  public readonly ICMS30?: ICMS30
  public readonly ICMS40?: ICMS40
  public readonly ICMS51?: ICMS51
  public readonly ICMS53?: ICMS53
  public readonly ICMS60?: ICMS60
  public readonly ICMS61?: ICMS61
  public readonly ICMS70?: ICMS70
  public readonly ICMS90?: ICMS90
  public readonly ICMSPart?: ICMSPart
  public readonly ICMSST?: ICMSST
  public readonly ICMSSN101?: ICMSSN101
  public readonly ICMSSN102?: ICMSSN102
  public readonly ICMSSN201?: ICMSSN201
  public readonly ICMSSN202?: ICMSSN202
  public readonly ICMSSN500?: ICMSSN500
  public readonly ICMSSN900?: ICMSSN900

  constructor(data: {
    ICMS00?: ICMS00
    ICMS02?: ICMS02
    ICMS10?: ICMS10
    ICMS15?: ICMS15
    ICMS20?: ICMS20
    ICMS30?: ICMS30
    ICMS40?: ICMS40
    ICMS51?: ICMS51
    ICMS53?: ICMS53
    ICMS60?: ICMS60
    ICMS61?: ICMS61
    ICMS70?: ICMS70
    ICMS90?: ICMS90
    ICMSPart?: ICMSPart
    ICMSST?: ICMSST
    ICMSSN101?: ICMSSN101
    ICMSSN102?: ICMSSN102
    ICMSSN201?: ICMSSN201
    ICMSSN202?: ICMSSN202
    ICMSSN500?: ICMSSN500
    ICMSSN900?: ICMSSN900
  }) {
    this.ICMS00 = data.ICMS00
    this.ICMS02 = data.ICMS02
    this.ICMS10 = data.ICMS10
    this.ICMS15 = data.ICMS15
    this.ICMS20 = data.ICMS20
    this.ICMS30 = data.ICMS30
    this.ICMS40 = data.ICMS40
    this.ICMS51 = data.ICMS51
    this.ICMS53 = data.ICMS53
    this.ICMS60 = data.ICMS60
    this.ICMS61 = data.ICMS61
    this.ICMS70 = data.ICMS70
    this.ICMS90 = data.ICMS90
    this.ICMSPart = data.ICMSPart
    this.ICMSST = data.ICMSST
    this.ICMSSN101 = data.ICMSSN101
    this.ICMSSN102 = data.ICMSSN102
    this.ICMSSN201 = data.ICMSSN201
    this.ICMSSN202 = data.ICMSSN202
    this.ICMSSN500 = data.ICMSSN500
    this.ICMSSN900 = data.ICMSSN900

    this.validateOrThrow()
  }

  public validateOrThrow(): void {
    // Lista de todos os tipos de ICMS possíveis
    const icmsTypes = [
      'ICMS00', 'ICMS02', 'ICMS10', 'ICMS15', 'ICMS20', 'ICMS30',
      'ICMS40', 'ICMS51', 'ICMS53', 'ICMS60', 'ICMS61',
      'ICMS70', 'ICMS90', 'ICMSPart', 'ICMSST', 'ICMSSN101',
      'ICMSSN102', 'ICMSSN201', 'ICMSSN202', 'ICMSSN500', 'ICMSSN900',
      'ICMSST'
    ]

    const definedTypes = icmsTypes.filter(type => this[type as keyof ICMS] !== undefined)

    if (definedTypes.length === 0) {
      throw new Error('Pelo menos um tipo de ICMS deve ser definido.')
    }
    if (definedTypes.length > 1) {
      throw new Error(`Apenas um tipo de ICMS pode ser definido. Tipos encontrados: ${definedTypes.join(', ')}`)
    }
  }
}