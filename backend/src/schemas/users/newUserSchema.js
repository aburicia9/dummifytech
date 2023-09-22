import { z } from 'zod'
// import { zodErrorMessages } from '../zodErrorMessage'
import zodErrorUtils from '../../utils/zodErrorUtils.json' assert{type:'json'}

console.log(zodErrorUtils.errors.custom);
export const newUserSchema = z.object({
  username: z.string(zodErrorUtils.errors.custom),

  email: z.string(zodErrorUtils.errors.custom).email(zodErrorUtils.errors.invalid_string.email),

  password: z
    .string()
    .min(8)
    .max(100)
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
})
