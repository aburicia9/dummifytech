import { selectAllCategoriesModel } from '../../models/categories/selectAllCategoriesModel.js'

export const getAllCategoriesController = async (req, res, next) => {
  try {
    const categories = await selectAllCategoriesModel()
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
