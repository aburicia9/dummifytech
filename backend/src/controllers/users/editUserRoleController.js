import { updateUserRoleModel } from '../../models/users/updateUserRoleModel.js'

export const editUserRoleController = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { role } = req.body

    await updateUserRoleModel(role, userId)

    res.send({
      status: 'ok',
      message: 'rol updated'
    })
  } catch (error) {
    next(error)
  }
}
