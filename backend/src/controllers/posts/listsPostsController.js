// Importamos modelo de select.
import { selectAllPostsModel } from '../../models/posts/selectAllPostsModel.js'

// funcion controladora para la lista de posts.
export const listPostsController = async (req, res, next) => {
  try {
    const { keyword } = req.query

    const posts = await selectAllPostsModel(keyword, req.user.id)
    res.send({
      status: 'ok',
      data: {
        posts
      }
    })
  } catch (error) {
    next(error)
  }
}
