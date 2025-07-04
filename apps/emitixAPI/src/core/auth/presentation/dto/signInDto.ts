import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsEmail({}, {
    message: 'O email deve ser um endereço de email válido.',
  })
  @IsNotEmpty({
    message: 'O email é obrigatório.',
  })
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, {
    message: 'A senha deve conter pelo menos 6 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.',
  })
  @IsNotEmpty({
    message: 'A senha é obrigatória.',
  })
  password: string;
}
