import { updateUserPasswordModel } from '../../models/users/updateUserPasswordModel.js'
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js'
import { validateSchema } from '../../schemas/validateSchema.js'
import { editUserPasswordSchema } from '../../schemas/users/editUserPasswordSchema.js'
import { fromZodError } from 'zod-validation-error'

export const editUserPasswordController = async (req, res, next) => {
  try {
    const user = await selectUserByIdModel(req.user.id)

    const { password } = req.body

    const result = await validateSchema(editUserPasswordSchema, req.body)

    if (!result.success) {
      throw fromZodError(result.error)
    }
    await updateUserPasswordModel(password, user)

    res.send({
      status: 'ok',
      message: 'Contraseña actualizada'
    })
  } catch (error) {
    next(error)
  }
}
