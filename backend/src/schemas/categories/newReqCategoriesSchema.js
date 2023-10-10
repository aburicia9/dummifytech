import { z } from 'zod'

export const newReqCategoriesSchema = z.object({
  categoryName: z.string({
    invalid_type_error: 'El nombre de la peticion de la categoria tiene que ser un texto',
    required_error: 'El nombre de la peticion de la categoria es requerido'
  })
    .min(1, 'El nombre de la peticion de la categoria debe tener al menos un caracter')
    .max(10000, 'El nombre de la peticion de la categoria no puede exceder los 10.000 caracteres'),
  categoryReason: z.string({
    invalid_type_error: 'La razon de la peticion de la categoria tiene que ser un texto',
    required_error: 'La razon de la peticion de la categoria es requerido'
  })
    .min(1, 'La razon de la de la categoria debe tener al menos un caracter')
    .max(10000, 'La razon de la de la categoria no puede exceder los 10.000 caracteres'),
  categoryParentId: z.number({
    invalid_type_error: 'La categoria de la peticion de la categoria tiene que ser un numero',
    required_error: 'La categoria de la peticion de la categoria es requerido'
  })

})
