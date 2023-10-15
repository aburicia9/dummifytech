import jwt from 'jsonwebtoken'
import { notAuthenticatedError, notFoundError, unauthorizedUserError } from '../../services/errorService.js'
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js'
import { updateUserVerificationModel } from '../../models/users/updateUserVerificationModel.js'
import { sendVerificationEmail } from '../../utils/email/sendVerificationEmail.js'

export const getUserVerificationController = async (req, res, next) => {
  try {
    // Obtener el token
    const { token } = req.params
    console.log('holaaaaa', token)

    try {
      const decoded = jwt.decode(token)
      const expireToken = decoded.exp * 1000
      const timeNow = new Date().getTime()

      if (timeNow > expireToken) {
        sendVerificationEmail(decoded.email, decoded.username, decoded.code)
        res.send({
          status: 'ok',
          message: 'Correo de verificacion enviado de nuevo'
        })
      }
    } catch (error) {
      res.send({
        status: 'Error',
        message: `Algo salio mal: ${error}`
      })
    }

    const data = jwt.verify(token, process.env.SECRET)
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
      unauthorizedUserError()
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
    next(error)
  }
}
