import { deleteDislikeModel } from '../../models/posts/deleteDislikeModel.js'

export const deleteDislikeController = async (req, res, next) => {
  try {
    const { postId } = req.params

    await deleteDislikeModel(postId, req.user.id)

    res.send({
      status: 'ok',
      message: 'DISLIKE OFF'
    })
  } catch (error) {
    next(error)
  }
}
