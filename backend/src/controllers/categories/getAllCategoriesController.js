import { selectAllCategoriesModel } from '../../models/categories/selectAllCategoriesModel.js'

export const getAllCategoriesController = async (req, res, next) => {
  try {
    const { categories, countCategories } = await selectAllCategoriesModel()
    res.send({
      status: 'ok',
      data: {
        categories,
        countCategories
      }

    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
