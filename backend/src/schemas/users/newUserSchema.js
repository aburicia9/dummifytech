import { z } from 'zod'
// import { zodErrorMessages } from '../zodErrorMessage'
// import zodErrorUtils from '../../utils/zodErrorUtils.json' assert{type:'json'}

export const newUserSchema = z.object({
  username: z.string({
    invalid_type_error: 'El nombre de usuario tiene que ser un texto',
    required_error: 'El nombre de usuario es requerido'
  }).min(3, 'El nombre de usuario tiene que tener minimo 3 caracteres')
    .max(30, 'Has superado el limite de caracteres(30)'),

  email: z.string({
    invalid_type_error: 'El email tiene que ser un texto',
    required_error: 'El email es requerido'
  })
    .email('El formato de correo no es el correcto'),

  password: z.string({
    invalid_type_error: 'La contraseña tiene que ser un texto',
    required_error: 'La contraseña es requerida'
  })
    .min(8, 'La contraseña tiene que tener como minimo 8 caracteres')
    .max(100, 'La contraseña tiene que tener como maximo 100 caracteres')
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/,
      'La contraseña debe contener al menos un número, una letra en minúscula, una letra en mayúscula y un caracter especial'
    ),
  fullName: z.string({
    invalid_type_error: 'El nombre completo tiene que ser un texto',
    required_error: 'El nombre completo es requerido'
  }).min(3, 'El nombre completo tiene que tener minimo 3 caracteres')
    .max(255, 'Has superado el limite de caracteres(255)')
})
