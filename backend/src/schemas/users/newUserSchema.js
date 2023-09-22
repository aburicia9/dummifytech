import { z } from 'zod'
// import { zodErrorMessages } from '../zodErrorMessage'
// import zodErrorUtils from '../../utils/zodErrorUtils.json' assert{type:'json'}

export const newUserSchema = z.object({
  username: z.string({
    invalid_type_error: 'El nombre de usuario tiene que ser un texto',
    required_error: 'El nombre de usuario es requerido'
  }).min(3, 'El nombre de usuario tiene que tener minimo 3 caracter'),

  email: z.string({
    invalid_type_error: 'El usuername tiene que ser un texto',
    required_error: 'El username es requerido'
  })
    .email('El formato de correo no es el correcto'),

  password: z.string({
    invalid_type_error: 'El usuername tiene que ser un texto',
    required_error: 'El username es requerido'
  })
    .min(8, 'La contraseña tiene que tener como minimo 8 caracteres')
    .max(100, 'La conttraseña tiene que tener como maximo 100 caracteres')
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
})
