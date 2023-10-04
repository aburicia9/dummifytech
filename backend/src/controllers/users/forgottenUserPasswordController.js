import { randomUUID } from 'crypto'
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js'
import { unauthorizedUserError } from '../../services/errorService.js'
import { sendNewPasswordEmail } from '../../utils/email/sendNewPasswordEmail.js'
import { updateUserPasswordModel } from '../../models/users/updateUserPasswordModel.js'

export const forgottenUserPasswordController = async (req, res, next) => {
  try {
    const { username, email } = req.body

    console.log(req.body)
    const user = await selectUserByEmailModel(email)

    if (username !== user.username) {
      unauthorizedUserError()
    }

    const password = randomUUID()

    await sendNewPasswordEmail(email, username, password)
    await updateUserPasswordModel(password, user.id)

    res.send({
      status: 'ok',
      message: '¡Contraseña cambiada con exito!'
    })
  } catch (error) {
    console.error(error)
  }
}
