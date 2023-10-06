import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js'
import bcrypt from 'bcrypt'
import { invalidCredentialsError, userNotVerificationError } from '../../services/errorService.js'
import jwt from 'jsonwebtoken'
import { loginUserSchema } from '../../schemas/users/loginUserSchema.js'
import { validateSchema } from '../../schemas/validateSchema.js'
import { fromZodError } from 'zod-validation-error'

export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Validamos los datos con zod
    const result = await validateSchema(loginUserSchema, req.body)

    if (!result.success) {
      throw fromZodError(result.error)
    }

    const user = await selectUserByEmailModel(email)
    if (user.status === 0) {
      userNotVerificationError()
    }

    const validPass = await bcrypt.compare(password, user.password)

    if (!validPass) {
      invalidCredentialsError()
    }

    const tokenInfo = {
      id: user.id,
      role: user.role
    }

    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: '1d'
    })
    res.send({
      status: 'ok',
      data: {
        token
      },
      message: 'El usuario ha iniciado sesion correctamente 🎉   '
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
