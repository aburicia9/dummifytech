import { z } from 'zod'
import { zodErrorMessages } from './zodErrorMessage'

export const imgSchema = z.object({
  name: z
    .string(zodErrorMessages.baseString)
    .required(zodErrorMessages.required),
  mimetype: z
    .string(zodErrorMessages.baseString)
    .valid('image/jpeg', 'image/png')
    .required(zodErrorMessages.required),
  size: z
    .number(zodErrorMessages.baseNumber)
    .max(5000000)
    .required(zodErrorMessages.required)
})
