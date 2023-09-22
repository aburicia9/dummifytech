import { z } from 'zod'
import { imgSchema } from '../imgSchema.js'

export const newPostSchema = z.object({
  title: z.string({
    invalid_type_error: 'El titulo tiene que ser un texto',
    required_error: 'El titulo es requerido'
  }).min(3, 'El título tiene que tener minimo 3 caracteres')
    .max(100, 'Has superado el limite de caracteres(100)'),

  post: z.string({
    invalid_type_error: 'El post tiene que ser un texto',
    required_error: 'El post es requerido'
  }).min(1, 'El post tiene que tener minimo 1 caracter')
    .max(255, 'Has superado el limite de caracteres(255)'),

  imgName: imgSchema.optional(),

  // id: z.number({
  //   invalid_type_error: 'El usuario tiene que ser un numero',
  //   required_error: 'El usuario es requerido'
  // }),

  categoryId: z.number({
    invalid_type_error: 'La categoria tiene que ser un numero',
    required_error: 'La categoria es requerida'
  })

})
