import { insertLikesModel } from '../../models/likes/insertLikesModel.js'

// Funcion donde insertamos likes.
export const newLikeController = async (req, res, next) => {
  try {
    // Aca obtenemos el post donde queremos dar like.
    const { postId } = req.params

    await insertLikesModel(postId, req.user.id)

    res.send({
      status: 'ok',
      message: 'LIKE'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
