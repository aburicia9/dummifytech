import { fromZodError } from 'zod-validation-error'
import { insertReqCategoryModel } from '../../models/categories/insertReqCategoryModel.js'
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js'
import { newReqCategoriesSchema } from '../../schemas/categories/newReqCategoriesSchema.js'
import { validateSchema } from '../../schemas/validateSchema.js'
import { sendCategoryEmail } from '../../utils/email/sendCategoryEmail.js'

export const newReqCategoryController = async (req, res, next) => {
  try {
    // const { userId } = req.params
    const { id: userId } = req.user
    const { categoryName, categoryReason, categoryParentId } = req.body

    console.log(typeof categoryParentId)

    const result = await validateSchema(newReqCategoriesSchema, req.body)

    if (!result.success) {
      throw fromZodError(result.error)
    }

    const user = await selectUserByIdModel(userId)

    await insertReqCategoryModel(userId, categoryParentId, categoryName, categoryReason)

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
