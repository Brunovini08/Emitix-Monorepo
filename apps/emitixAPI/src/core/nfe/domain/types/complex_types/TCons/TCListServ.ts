import { IsString, Matches } from 'class-validator';

export class TCListServ {
  @IsString()
  @Matches(/^[0-9]{2}.[0-9]{2}$/)
  @IsString()
  ListServ: string;
}
