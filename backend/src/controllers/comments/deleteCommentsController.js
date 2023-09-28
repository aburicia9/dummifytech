import { deleteCommentModel } from '../../models/comments/deleteCommentModel.js'

export const deleteCommentsController = async (req, res, next) => {
  try {
    const { commentId } = req.params

    await deleteCommentModel(commentId, req.user.id)

    res.send({
      status: 'ok',
      message: 'Comentario Eliminado'
    })
  } catch (error) {
    next(error)
  }
}
