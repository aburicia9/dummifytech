import { z } from 'zod'

export const loginUserSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'El email tiene que ser un texto',
      required_error: 'El emailo es requerido'
    })
    .email('El formato de correo no es el correcto'),
  password: z.string({
    invalid_type_error: 'El password tiene que ser un texto',
    required_error: 'El password es requerido'
  })
})
