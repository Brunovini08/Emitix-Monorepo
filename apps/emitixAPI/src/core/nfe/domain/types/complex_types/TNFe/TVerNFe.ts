import { Equals, IsNotEmpty, IsString } from 'class-validator';

export class TVerNFe {
  @IsNotEmpty({
    message: 'Tipo versão da NF-e - 4.00',
  })
  @IsString()
  @Equals('4\.00')
  version: string;
}
