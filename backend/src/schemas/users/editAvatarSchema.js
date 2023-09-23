import { z } from 'zod'
import { imgSchema } from '../imgSchema.js'

// Creamos el esquema de validacion para la importacion del avatar
export const editAvatarSchema = z.object({
  avatar: imgSchema.optional()
})
