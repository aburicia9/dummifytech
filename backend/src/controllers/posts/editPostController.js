import { fromZodError } from 'zod-validation-error'
import { updatePostModel } from '../../models/posts/updatePostModel.js'
import { validateSchema } from '../../schemas/validateSchema.js'
import { selectPostByIdModel } from '../../models/posts/selectPostByIdModel.js'
import { updatePostSchema } from '../../schemas/posts/updatePostSchema.js'
import { savePhoto } from '../../utils/savePhoto.js'
import { UPLOADS_DIR_POST } from '../../utils/constants.js'

export const editPostController = async (req, res, next) => {
  try {
    const { postId } = req.params
    let { post, title } = req.body

    const postDetail = await selectPostByIdModel(req.user.id, postId)

    // Variable que almacenará el nombre de la imagen(si hay)
    let imgName

    // Si existe alguna imagen la guardamos y obtenemos su nombre (hace falta el joi)
    if (req.files?.imgName) {
      imgName = await savePhoto(req.files.imgName, 500, UPLOADS_DIR_POST.POST)
    }

    const result = await validateSchema(updatePostSchema, req.body)

    if (!result.success) {
      throw fromZodError(result.error)
    }

    // if (postDetail.title !== title || postDetail.post !== post || postDetail.image !== imgName)
    if (postDetail.title !== title) {
      title = postDetail.title
    }
    if (postDetail.post !== post) {
      post = postDetail.post
    }
    if (postDetail.image !== imgName) {
      imgName = postDetail.image
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
