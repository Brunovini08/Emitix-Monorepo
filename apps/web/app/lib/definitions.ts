import { z } from 'zod'
 
export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Por favor, coloque o seu email.' }).trim(),
  password: z
    .string()
    .min(6, { message: 'Por favor, sua senha deve ter no mínimo 6 caracters'})
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined


  // .min(8, { message: 'A senha deve conter no mínimo 8 caracters' })
  //   .regex(/[a-zA-Z]/, { message: 'Deve conter uma letra maiúscula.' })
  //   .regex(/[0-9]/, { message: 'Deve contar pelo menos um número.' })
  //   .regex(/[^a-zA-Z0-9]/, {
  //     message: 'Deve conter pelo menos um caracter especial.',
  //   })