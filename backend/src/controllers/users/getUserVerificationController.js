import jwt from 'jsonwebtoken'
import { notAuthenticatedError, notFoundError } from '../../services/errorService.js'
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js'
import { updateUserVerificationModel } from '../../models/users/updateUserVerificationModel.js'

export const getUserVerificationController = async (req, res, next) => {
  try {
    // Obtener el token
    const { token } = req.params
    let data

    jwt.verify(token, process.env.SECRET, (error, data) => {
      if (error) {
        error = {
          name: 'TokenExpiredError',
          message: 'jwt expired',
          expiredAt: 1408621000
        }
        return error
      }
      console.log(data)
      return data
    })

    // Verificar los datos
    if (!data) {
      notAuthenticatedError()
    }
    const { email, code } = data

    // Verificamos si el usuario existe
    const user = await selectUserByEmailModel(email)

    if (user < 1) {
      notFoundError('usuario')
    }

    // Verificar el codigo de verificacion
    if (code !== user.verification_code) {
      return res.redirect('../../utils/email/templateErrorEmail.html')
    }
    // Actualizar usuario
    await updateUserVerificationModel(email, code)

    // Redireccionar a la confirmacion

    res.send({
      status: 'ok',
      message: 'Usuario verificado ✅'
    })
  } catch (error) {
    console.log(error)
  }
}
