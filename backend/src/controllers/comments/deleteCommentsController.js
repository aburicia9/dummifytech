import { deleteCommentModel } from '../../models/comments/deleteCommentModel.js'
import { selectAllCommentModel } from '../../models/comments/selectACommentByIdModel.js'
import { sendDeleteEmail } from '../../utils/email/sendDeleteEmail.js'

export const deleteCommentsController = async (req, res, next) => {
  try {
    const { commentId } = req.params
    const { id: userId } = req.user
    const type = 'comentario'

    const comment = await selectAllCommentModel(commentId)

    const contextEmail = `comentario: ${comment.comment}`

    await deleteCommentModel(commentId, req.user.id)

    await sendDeleteEmail(userId, type, contextEmail)

    res.send({
      status: 'ok',
      message: 'Comentario Eliminado'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
