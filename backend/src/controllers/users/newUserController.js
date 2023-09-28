// Importamos los modelos.
import { fromZodError } from 'zod-validation-error'
import { insertUserModel } from '../../models/users/insertUserModel.js'

// Importamos la funcion de validar esquemas
import { newUserSchema } from '../../schemas/users/newUserSchema.js'
// Importamos la funcion que va a validar los esquemas
import { validateSchema } from '../../schemas/validateSchema.js'
import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'
import { getTemplate, sendEmail } from '../../utils/email/configEmail.js'

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

    // Creamos un token  para verificar si el usuario ha verificado el correo
    const tokenInfo = {
      email,
      code
    }
    // Generamos el token temporal para la verificacion
    const token = jwt.sign(tokenInfo, process.env.SECRET, { expiresIn: '10s' })
    // Obtenemos el template
    const template = getTemplate(username, token)

    // Enviamos el correo
    await sendEmail(email, 'Correo de verificacion de usuario', template)

    await insertUserModel(username, email, password, fullName, code)

    res.send({
      status: 'ok',
      message: 'Usuario creado ✅'
    })
  } catch (error) {
    next(error)
  }
}
