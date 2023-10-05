import { z } from 'zod'
// import { zodErrorMessages } from '../zodErrorMessage'
// import zodErrorUtils from '../../utils/zodErrorUtils.json' assert{type:'json'}

export const editUserPasswordSchema = z.object({

  password: z.string({
    invalid_type_error: 'La contraseña tiene que ser un texto',
    required_error: 'La contraseña es requerida'
  })
    .min(8, 'La contraseña tiene que tener como minimo 8 caracteres')
    .max(100, 'La contraseña tiene que tener como maximo 100 caracteres')
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/,
      `La contraseña debe contener\n
      - Al menos un número\n 
      - Una letra en minúscula\n 
      - Una letra en mayúscula\n
      - Un caracter especial`
    )
})
