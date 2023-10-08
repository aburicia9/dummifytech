import { updateUserPasswordModel } from '../../models/users/updateUserPasswordModel.js'
import { validateSchema } from '../../schemas/validateSchema.js'
import { editUserPasswordSchema } from '../../schemas/users/editUserPasswordSchema.js'
import { fromZodError } from 'zod-validation-error'
import { invalidCredentialsError } from '../../services/errorService.js'
import bcrypt from 'bcrypt'
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js'
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js'

export const editUserPasswordController = async (req, res, next) => {
  try {
    const userId = await selectUserByIdModel(req.user.id)

    const userEmail = await selectUserByEmailModel(userId.email)

    const { oldPassword, newPassword } = req.body
    const validPass = await bcrypt.compare(oldPassword, userEmail.password)

    if (!validPass) {
      invalidCredentialsError()
    }

    const password = { password: newPassword }

    const result = await validateSchema(editUserPasswordSchema, password)
    if (!result.success) {
      throw fromZodError(result.error)
    }

    await updateUserPasswordModel(newPassword, userId.id)

    res.send({
      status: 'ok',
      message: 'Contraseña actualizada'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
