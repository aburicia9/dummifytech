import { deleteCategoryModel } from '../../models/categories/deleteCategoryModel.js'

export const deleteCategoryController = async (req, res, next) => {
  try {
    const { categoryId } = req.params

    await deleteCategoryModel(categoryId)

    res.send({
      status: 'ok',
      message: '¡Categoria borrada!'
    })
  } catch (error) {
    next(error)
  }
}
