import { z } from 'zod'

export const imgSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'El nombre tiene que ser un texto',
      required_error: 'El nombre es requerido'
    }),
  mimetype: z
    .string({ invalid_type_error: 'La imagen tiene que ser un texto' })
    .refine(
      (mimeType) => mimeType === 'image/jpeg' || mimeType === 'image/png', { message: 'El tipo de archivo debe ser JPEG o PNG' }
    ),
  size: z
    .number({
      invalid_type_error: 'El tamaño tiene que ser un numero',
      required_error: 'El tamaño es requerido'
    })
    .max(100000000, 'El tamaño maximo es 100mb')
})
