import { fromZodError } from 'zod-validation-error'
import { insertCommentsModel } from '../../models/comments/insertCommentsModel.js'
import { newCommentSchema } from '../../schemas/comment/newCommentSchema.js'
import { validateSchema } from '../../schemas/validateSchema.js'

export const newCommentController = async (req, res, next) => {
  try {
    const { comment } = req.body
    // Cuando te traes la información de la url es path params y se inicializa con req.params
    // Cuando te traes la información despues del interrogante de la url, sería query params y se inicializa con req.query
    const { postId, commentId } = req.params

    const result = await validateSchema(newCommentSchema, req.body)

    if (!result.success) {
      throw fromZodError(result.error)
    }

    await insertCommentsModel(commentId, comment, req.user.id, postId)

    res.send({
      status: 'ok',
      message: '¡Comentario Creado!'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
