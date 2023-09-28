// Importamos los modelos.
import { fromZodError } from 'zod-validation-error'
import { insertUserModel } from '../../models/users/insertUserModel.js'
import { randomUUID } from 'crypto'

// Importamos la funcion de validar esquemas
import { newUserSchema } from '../../schemas/users/newUserSchema.js'
// Importamos la funcion que va a validar los esquemas
import { validateSchema } from '../../schemas/validateSchema.js'
import { sendVerificationEmail } from '../../utils/email/sendVerificationEmail.js'

// Funcion controladora final que inserta un nuevo usuario.
export const newUserController = async (req, res, next) => {
  try {
    // Importamos los datos al body
    const { username, email, password, fullName } = req.body

    // Validamos los datos con zod
    const result = await validateSchema(newUserSchema, req.body)

    if (!result.success) {
      throw fromZodError(result.error)
    }
    // Generamos un codigo
    const code = randomUUID()

    await sendVerificationEmail(email, username, code)

    await insertUserModel(username, email, password, fullName, code)

    res.send({
      status: 'ok',
      message: 'Usuario creado ✅'
    })
  } catch (error) {
    next(error)
  }
}
