import { editCategoryModel } from '../../models/categories/editCategoryModel.js'

export const editCategoryController = async (req, res, next) => {
  try {
    const { name, description, categoryId } = req.body
    await editCategoryModel(name, description, categoryId)
    res.send({
      status: 'ok',
      message: 'categoria actualizada!'
    })
  } catch (error) {
    next(error)
  }
}
