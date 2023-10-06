import { selectPostByIdCategoryModel } from '../../models/posts/selectPostByIdCategoryModel.js'

export const getPostByIdCategoryController = async (req, res, next) => {
  try {
    const { categoryId, keyword } = req.params

    const posts = await selectPostByIdCategoryModel(categoryId, keyword, req.user.id)
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
