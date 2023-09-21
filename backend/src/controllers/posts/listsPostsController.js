// Importamos modelo de select.
import { sellectAllPostsModel } from '../../models/posts/sellectAllPostsModel.js'

// funcion controladora para la lista de posts.
export const listPostsController = async (req, res, next) => {
  try {
    const posts = await sellectAllPostsModel()

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
