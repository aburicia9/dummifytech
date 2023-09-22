import { deleteLikeModel } from '../../models/posts/deleteLikeModel.js'

// Funcion en la que quitamos un like.
export const deleteLikeController = async (req, res, next) => {
  try {
    const { postId } = req.params

    await deleteLikeModel(postId, req.user.id)

    res.send({
      status: 'ok',
      message: 'UNLIKE'
    })
  } catch (error) {
    next(error)
  }
}
