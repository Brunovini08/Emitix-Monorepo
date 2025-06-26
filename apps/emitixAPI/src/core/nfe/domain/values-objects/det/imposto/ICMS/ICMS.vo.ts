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

// Definição de todos os tipos de ICMS possíveis
export type ICMSType =
  | 'ICMS00' | 'ICMS02' | 'ICMS10' | 'ICMS15' | 'ICMS20' 
  | 'ICMS30' | 'ICMS40' | 'ICMS51' | 'ICMS53' | 'ICMS60' 
  | 'ICMS61' | 'ICMS70' | 'ICMS90' | 'ICMSPart' | 'ICMSST' 
  | 'ICMSSN101' | 'ICMSSN102' | 'ICMSSN201' | 'ICMSSN202' 
  | 'ICMSSN500' | 'ICMSSN900';

// Interface que representa os valores possíveis para cada tipo
export type ICMSValues = {
  ICMS00?: ICMS00;
  ICMS02?: ICMS02;
  ICMS10?: ICMS10;
  ICMS15?: ICMS15;
  ICMS20?: ICMS20;
  ICMS30?: ICMS30;
  ICMS40?: ICMS40;
  ICMS51?: ICMS51;
  ICMS53?: ICMS53;
  ICMS60?: ICMS60;
  ICMS61?: ICMS61;
  ICMS70?: ICMS70;
  ICMS90?: ICMS90;
  ICMSPart?: ICMSPart;
  ICMSST?: ICMSST;
  ICMSSN101?: ICMSSN101;
  ICMSSN102?: ICMSSN102;
  ICMSSN201?: ICMSSN201;
  ICMSSN202?: ICMSSN202;
  ICMSSN500?: ICMSSN500;
  ICMSSN900?: ICMSSN900;
};

export class ICMS {
  private readonly _type: ICMSType;
  private readonly _value: any;

  constructor(data: Partial<ICMSValues>) {
    const types = Object.keys(data) as ICMSType[];
    if (types.length !== 1) {
      throw new Error(`ICMS deve conter exatamente um tipo. Encontrados: ${types.join(', ')}`);
    }

    this._type = types[0];
    this._value = data[this._type];

    if (!this._value) {
      throw new Error(`Valor para ${this._type} não definido.`);
    }

    this._value.validateOrThrow?.(); // se existir
    Object.freeze(this);
  }

  public get type(): ICMSType {
    return this._type;
  }

  public get value(): any {
    return this._value;
  }

  public equals(other: ICMS): boolean {
    return this._type === other._type && this._value.equals(other._value);
  }

  public toJSON(): any {
    return this._value?.toJSON ? this._value.toJSON() : this._value;
  }
}


