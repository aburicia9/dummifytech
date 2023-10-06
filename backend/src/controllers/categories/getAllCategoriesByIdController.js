import { selectAllCategoriesByIdModel } from '../../models/categories/selectAllCategoriesByIdModel.js'

export const getAllCategoriesByIdController = async (req, res, next) => {
  const { categoryId } = req.params
  try {
    const { categories } = await selectAllCategoriesByIdModel(categoryId)
    res.send({
      status: 'ok',
      data: {
        categories
      }

    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
