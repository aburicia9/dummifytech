import { updateUserPasswordModel } from '../../models/users/updateUserPasswordModel.js'
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js'

export const editUserPasswordController = async (req, res, next) => {
  try {
    const user = await selectUserByIdModel(req.user.id)

    const { password } = req.body
    await updateUserPasswordModel(password, user)

    res.send({
      status: 'ok',
      message: 'Contraseña actualizada'
    })
  } catch (error) {
    next(error)
  }
}
