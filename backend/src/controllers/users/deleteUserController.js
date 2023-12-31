import { deleteUserModel } from '../../models/users/deleteUserModel.js'
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js'
import { sendDeleteEmail } from '../../utils/email/sendDeleteEmail.js'

export const deleteUserController = async (req, res, next) => {
  try {
    // const { id: myUserId } = req.user
    const { userId: otherUserId } = req.params
    const user = await selectUserByIdModel(otherUserId)
    const type = 'usuario'
    const contextEmail = `username: ${user.username}`
    await sendDeleteEmail(otherUserId, type, contextEmail)

    await deleteUserModel(otherUserId)
    res.send({
      status: 'ok',
      message: '¡Usuario borrado!'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
