import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class TGuid {
  @IsNotEmpty({
    message: 'Identificador único (Globally Unique Identifier)',
  })
  @IsString()
  @Matches(/^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$/)
  guid: string;
}
