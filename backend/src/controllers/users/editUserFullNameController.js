import { fromZodError } from 'zod-validation-error'
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js'
import { updateUserFullNameModel } from '../../models/users/updateUserFullNameModel.js'
import { editUserFullNameSchema } from '../../schemas/users/editUserFullNameSchema.js'
import { validateSchema } from '../../schemas/validateSchema.js'

export const editUserFullNameController = async (req, res, next) => {
  try {
    const user = await selectUserByIdModel(req.user.id)

    const { fullName } = req.body

    const result = await validateSchema(editUserFullNameSchema, req.body)

    if (!result.success) {
      throw fromZodError(result.error)
    }

    await updateUserFullNameModel(fullName, user)

    res.send({
      status: 'ok',
      message: 'Nombre completo actualizado'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
