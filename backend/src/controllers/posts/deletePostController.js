import { deletePostModel } from '../../models/posts/deletePostModel.js'

// Funcion controladora donde eliminamos el post
export const deletePostController = async (req, res, next) => {
  try {
    const { postId } = req.params

    await deletePostModel(postId, req.user.id)

    res.send({
      status: 'ok',
      message: '¡Post eliminado Correctamente!'
    })
  } catch (error) {
    next(error)
  }
}
