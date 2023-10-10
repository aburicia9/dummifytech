import { selectPostByIdModel } from '../../models/posts/selectPostByIdModel.js'

export const getPostByIdController = async (req, res, next) => {
  try {
    const { postId } = req.params

    const posts = await selectPostByIdModel(req.user.id, postId)
    res.send({
      status: 'ok',
      data: {
        posts
      }
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
