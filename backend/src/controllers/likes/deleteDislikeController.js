import { deleteDislikeModel } from '../../models/likes/deleteDislikeModel.js'

export const deleteDislikeController = async (req, res, next) => {
  try {
    const { postId } = req.params

    await deleteDislikeModel(postId, req.user.id)

    res.send({
      status: 'ok',
      message: 'DISLIKE OFF'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
