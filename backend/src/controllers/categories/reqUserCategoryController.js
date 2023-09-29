import { insertReqCategoryModel } from '../../models/categories/insertReqCategoryModel.js'
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js'
import { sendCategoryEmail } from '../../utils/email/sendCategoryEmail.js'

export const newReqCategoryController = async (req, res, next) => {
  try {
    // const { userId } = req.params
    const { id: userId } = req.user
    const { categoryName, categoryReason } = req.body

    const user = await selectUserByIdModel(userId)

    await insertReqCategoryModel(userId, categoryName, categoryReason)

    await sendCategoryEmail(user.username, categoryName, categoryReason, user.email)

    res.send({
      status: 'ok',
      message: 'La petición esta en proceso.'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
