import { selectAllReqCategoriesModel } from '../../models/categories/selectAllReqCategoriesModel.js'

export const getAllReqCategoriesController = async (req, res, next) => {
  try {
    const reqCategories = await selectAllReqCategoriesModel()
    console.log(reqCategories)
    res.send({
      status: 'ok',
      data: {
        reqCategories
      }
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
