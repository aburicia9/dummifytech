import { insertDislikeModel } from '../../models/posts/insertDislikeModel.js'

export const newDislikeController = async (req, res, next) => {
  try {
    const { postId } = req.params

    await insertDislikeModel(postId, req.user.id)

    res.send({
      status: 'ok',
      message: 'DISLIKE'
    })
  } catch (error) {
    next(error)
  }
}
