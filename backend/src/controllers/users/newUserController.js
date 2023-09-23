// Importamos los modelos.
import { fromZodError } from 'zod-validation-error'
import { insertUserModel } from '../../models/users/insertUserModel.js'

// Importamos la funcion de validar esquemas
import { newUserSchema } from '../../schemas/users/newUserSchema.js'
// Importamos la funcion que va a validar los esquemas
import { validateSchema } from '../../schemas/validateSchema.js'

// Funcion controladora final que inserta un nuevo usuario.
export const newUserController = async (req, res, next) => {
  try {
    // Importamos los datos al body
    const { username, email, password, fullName } = req.body
    // console.log(req.body)

    // Validamos los datos con zod
    const result = await validateSchema(newUserSchema, req.body)

    if (!result.success) {
      throw fromZodError(result.error)
    }

    await insertUserModel(username, email, password, fullName)

    res.send({
      status: 'ok',
      message: 'Usuario creado ✅'
    })
  } catch (error) {
    next(error)
  }
}
