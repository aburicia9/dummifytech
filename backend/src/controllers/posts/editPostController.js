import { fromZodError } from 'zod-validation-error'
import { updatePostModel } from '../../models/posts/updatePostModel.js'
import { validateSchema } from '../../schemas/validateSchema.js'
import { updatePostSchema } from '../../schemas/posts/updatePostSchema.js'
import { savePhoto } from '../../utils/savePhoto.js'
import { UPLOADS_DIRS } from '../../utils/constants.js'

export const editPostController = async (req, res, next) => {
  try {
    const { postId } = req.params
    const { post, title, imgName } = req.body
    console.log({ post, title, imgName })
    // Variable que almacenará el nombre de la imagen(si hay)
    let fileImgName

    // Si existe alguna imagen la guardamos y obtenemos su nombre (hace falta el joi)
    if (req.files?.imgName) {
      fileImgName = await savePhoto(req.files.imgName, 500, UPLOADS_DIRS.POST)
    }

    const result = await validateSchema(updatePostSchema, req.body)

    if (!result.success) {
      throw fromZodError(result.error)
    }

    if (fileImgName) {
      await updatePostModel(postId, post, title, req.user.id, fileImgName)
      res.send({
        status: 'ok',
        message: '¡Post Editado!'
      })
    }

    await updatePostModel(postId, post, title, req.user.id, imgName)
    res.send({
      status: 'ok',
      message: '¡Post Editado!'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
