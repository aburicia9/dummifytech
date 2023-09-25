// Importamos modelo de select.
import { selectAllPostsModel } from '../../models/posts/selectAllPostsModel.js'

// funcion controladora para la lista de posts.
export const getAllCommentsController = async (req, res, next) => {
  try {
    const { postId } = req.params
    const comments = await selectAllPostsModel(postId)

    res.send({
      status: 'ok',
      data: {
        comments
      }
    })
  } catch (error) {
    next(error)
  }
}
