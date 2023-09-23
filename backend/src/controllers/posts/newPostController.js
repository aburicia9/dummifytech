// Importamos el modelo.
import { fromZodError } from 'zod-validation-error'
import { insertPostModel } from '../../models/posts/insertPostModel.js'
import { newPostSchema } from '../../schemas/posts/newPostSchema.js'
import { savePhoto } from '../../utils/savePhoto.js'
import { validateSchema } from '../../schemas/validateSchema.js'
import { UPLOADS_DIRS } from '../../utils/constants.js'

// Funcion controladora donde se inserta el post.
export const newPostController = async (req, res, next) => {
  try {
    const { title, post, categoryId } = req.body
    req.body.categoryId = Number(categoryId)

    const result = await validateSchema(newPostSchema, { ...req.body, ...req.files, ...req.user.id })
    if (!result.success) {
      throw fromZodError(result.error)
    }
    // Variable que almacenará el nombre de la imagen(si hay)
    let imgName
    console.log(req.files)
    // Si existe alguna imagen la guardamos y obtenemos su nombre (hace falta el joi)
    if (req.files?.imgName) {
      imgName = await savePhoto(req.files.imgName, 500, UPLOADS_DIRS.POST)
    }
    // console.log({ imgName })
    await insertPostModel(title, post, imgName, req.user.id, categoryId)

    res.send({
      status: 'ok',
      message: '¡Publicación Creada!'
    })
  } catch (error) {
    next(error)
  }
}
