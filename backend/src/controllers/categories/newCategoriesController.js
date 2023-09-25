import { insertCategoriesModel } from '../../models/categories/insertCategoriesModel.js'
import { UPLOADS_DIR } from '../../utils/constants.js'
import { savePhoto } from '../../utils/savePhoto.js'

export const newCategoriesController = async (req, res, next) => {
  try {
    const { subCategories, name, description } = req.body
    req.body.subCategories = Number(subCategories)

    let imgName
    if (req.files?.imgName) {
      imgName = await savePhoto(req.files.imgName, 500, UPLOADS_DIR.CATEGORY)
    }
    await insertCategoriesModel(subCategories, name, description, imgName)
    res.send({
      status: 'ok',
      message: 'Categoria creada!'
    })
  } catch (error) {
    next(error)
  }
}
