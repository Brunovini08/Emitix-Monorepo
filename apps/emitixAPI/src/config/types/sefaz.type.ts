import type { Ambiente } from './ambiente.type';
import { Estado } from './estado.type';
import type { Servico } from './servico.type';
export type Sefazconfig = {
  [estado in Estado]: {
    [ambiente in Ambiente]: {
      [servico in Servico]: string;
    };
  };
};
