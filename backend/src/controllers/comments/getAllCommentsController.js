// Importamos modelo de select.
import { selectAllCommentModel } from '../../models/comments/selectAllCommentModel.js'

// funcion controladora para la lista de posts.
export const getAllCommentsController = async (req, res, next) => {
  try {
    const { postId } = req.params
    const comments = await selectAllCommentModel(postId)

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
