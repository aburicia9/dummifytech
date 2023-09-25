import { selectMyPostModel } from '../../models/posts/selectMyPostsModel.js'

export const listMyPostsController = async (req, res, next) => {
  try {
    const myPosts = await selectMyPostModel(req.user.id)
    res.send({
      data: {
        myPosts
      }
    })
  } catch (error) {
    next(error)
  }
}
