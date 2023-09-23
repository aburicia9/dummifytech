import { z } from 'zod'
// import { zodErrorMessages } from '../zodErrorMessage'
// import zodErrorUtils from '../../utils/zodErrorUtils.json' assert{type:'json'}

export const editUserFullNameSchema = z.object({

  fullName: z.string({
    invalid_type_error: 'El nombre completo tiene que ser un texto',
    required_error: 'El nombre completo es requerido'
  }).min(3, 'El nombre completo tiene que tener minimo 3 caracteres')
    .max(255, 'Has superado el limite de caracteres(255)')
})
