import { getIdSubcategoryModel } from '../../models/categories/getIdSubcategoryModel.js'

export const getIdSubcategoryController = async (req, res, next) => {
  try {
    const { categoryId } = req.params

    const posts = await getIdSubcategoryModel(categoryId, req.user.id)
    res.send({
      status: 'ok',
      data: {
        posts
      }
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
