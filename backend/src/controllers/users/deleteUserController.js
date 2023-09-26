import { deleteUserModel } from '../../models/users/deleteUserModel.js'

export const deleteUserController = async (req, res, next) => {
  try {
    await deleteUserModel(req.user.id)

    res.send({
      status: 'ok',
      message: '¡Usuario borrado!'
    })
  } catch (error) {
    next(error)
  }
}
