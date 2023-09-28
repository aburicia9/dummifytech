import { selectAllUserModel } from '../../models/users/selectAllUserModel.js'

export const getAllUserController = async (req, res, next) => {
  try {
    const users = await selectAllUserModel()

    res.send({
      status: 'ok',
      data: {
        users
      }
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
