import { fromZodError } from 'zod-validation-error'
import { updateCommentModel } from '../../models/comments/updateCommentModel.js'
import { validateSchema } from '../../schemas/validateSchema.js'
import { newCommentSchema } from '../../schemas/comment/newCommentSchema.js'

export const editCommentController = async (req, res, next) => {
  try {
    const { commentId } = req.params
    const { comment } = req.body
    console.log(commentId)

    const result = await validateSchema(newCommentSchema, req.body)
    if (!result.success) {
      throw fromZodError(result.error)
    }
    await updateCommentModel(commentId, comment, req.user.id)

    res.send({
      status: 'ok',
      message: '¡Comentario editado!'
    })
  } catch (error) {
    next(error)
  }
}
