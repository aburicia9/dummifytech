import { z } from 'zod'

import { zodErrorMessages } from '../zodErrorMessage.js'

export const loginUserSchema = z.object({
  email: z
    .string(zodErrorMessages.baseString)
    .email(zodErrorMessages.emailString)
    .required(zodErrorMessages.required),
  password: z
    .string(zodErrorMessages.baseString)
    .required(zodErrorMessages.required)
})
