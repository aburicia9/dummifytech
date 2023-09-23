import { notRegisteredUserPostModel } from '../../models/posts/notRegisteredUserPostModel.js'

export const notRegisteredUserPostController = async (req, res, next) => {
  try {
    const post = await notRegisteredUserPostModel()

    res.send({
      status: 'ok',
      data: post
    })
  } catch (error) {
    next(error)
  }
}
