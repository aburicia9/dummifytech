import { deleteUserModel } from '../../models/users/deleteUserModel.js'
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js'
import { sendDeleteEmail } from '../../utils/email/sendDeleteEmail.js'

export const deleteMyUserController = async (req, res, next) => {
  try {
    // const { id: myUserId } = req.user
    const { id: userId } = req.user
    const user = await selectUserByIdModel(userId)
    const type = 'usuario'
    const contextEmail = `username: ${user.username}`
    await sendDeleteEmail(userId, type, contextEmail)

    await deleteUserModel(userId)
    res.send({
      status: 'ok',
      message: '¡Usuario borrado!'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
