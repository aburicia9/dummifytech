import { deletePostModel } from '../../models/posts/deletePostModel.js'
import { selectPostByIdModel } from '../../models/posts/selectPostByIdModel.js'

import { sendDeleteEmail } from '../../utils/email/sendDeleteEmail.js'

// Funcion controladora donde eliminamos el post
export const deletePostController = async (req, res, next) => {
  try {
    const { postId } = req.params
    const { id: userId } = req.user

    const post = await selectPostByIdModel(userId, postId)
    const type = 'post'
    console.log(post)
    const contextEmail = `titulo: ${post.title}`

    await deletePostModel(postId, userId)
    await sendDeleteEmail(userId, type, contextEmail)

    res.send({
      status: 'ok',
      message: '¡Post eliminado Correctamente!'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
