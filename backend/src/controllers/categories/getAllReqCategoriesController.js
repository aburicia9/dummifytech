import { selectAllReqCategoriesModel } from '../../models/categories/selectAllReqCategoriesModel.js'

export const getAllReqCategoriesController = async (req, res, next) => {
  try {
    const categories = await selectAllReqCategoriesModel()
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
