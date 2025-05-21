import { IsString } from 'class-validator';

export class TServ {
  @IsString()
  // Código do serviço, com 1 a 5 caracteres alfanuméricos.
  serv!: string;
}
