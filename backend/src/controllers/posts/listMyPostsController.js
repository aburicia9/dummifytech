import { selectMyPostModel } from '../../models/posts/selectMyPostsModel.js'

export const listMyPostsController = async (req, res, next) => {
  try {
    const posts = await selectMyPostModel(req.user.id)
    res.send({
      data: {
        posts
      }
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
