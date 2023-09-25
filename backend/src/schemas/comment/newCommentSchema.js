import { z } from 'zod'

export const newCommentSchema = z.object({
  comment: z.string({
    invalid_type_error: 'El comentario tiene que ser un texto',
    required_error: 'El comentario es requerido'
  })
    .min(1, 'El comentario debe tener al menos un caracter')
    .max(10000, 'El comentario no puede exceder los 10.000 caracteres')
})
