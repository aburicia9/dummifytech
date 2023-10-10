import { fromZodError } from 'zod-validation-error'
import { updatePostModel } from '../../models/posts/updatePostModel.js'
import { validateSchema } from '../../schemas/validateSchema.js'
import { updatePostSchema } from '../../schemas/posts/updatePostSchema.js'
import { savePhoto } from '../../utils/savePhoto.js'
import { UPLOADS_DIRS } from '../../utils/constants.js'
import { updatePostWithoutPhotoSchema } from '../../schemas/posts/updatePostWithoutPhotoSchema.js'

export const editPostController = async (req, res, next) => {
  try {
    const { postId } = req.params
    const { post, title, imgName } = req.body
    const { id: userId } = req.user

    // Variable que almacenará el nombre de la imagen(si hay)
    let fileImgName

    // Si existe alguna imagen la guardamos y obtenemos su nombre (hace falta el joi)
    if (req.files?.imgName) {
      fileImgName = await savePhoto(req.files.imgName, 500, UPLOADS_DIRS.POST)
    }

    const result = await validateSchema(updatePostWithoutPhotoSchema, req.body)
    if (!result.success) {
      throw fromZodError(result.error)
    }

    if (fileImgName) {
      const result = await validateSchema(updatePostSchema, req.body)

      if (!result.success) {
        throw fromZodError(result.error)
      }
      await updatePostModel(postId, post, title, userId, fileImgName)
      res.send({
        status: 'ok',
        message: '¡Post Editado!'
      })
      return
    }
    console.log('AQUI NO LLEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    await updatePostModel(postId, post, title, userId, imgName)
    res.send({
      status: 'ok',
      message: '¡Post Editado!'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
