import { selectPostByIdModel } from '../../models/posts/selectPostByIdModel.js'

export const getPostByIdController = async (req, res, next) => {
  try {
    const { postId } = req.params
    const { id: userId } = req.user

    const posts = await selectPostByIdModel(postId, userId)
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
