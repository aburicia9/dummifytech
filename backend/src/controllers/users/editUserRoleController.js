import { updateUserRoleModel } from '../../models/users/updateUserRoleModel.js'

export const editUserRoleController = async (req, res, next) => {
  try {
    const { role, userId } = req.body
    await updateUserRoleModel(role, userId)

    res.send({
      status: 'ok',
      message: '¡Rol de usuario actualizado! 👌'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
