import { notRegisteredUserPostModel } from '../../models/posts/notRegisteredUserPostModel.js'

export const notRegisteredUserPostController = async (req, res, next) => {
  try {
    const post = await notRegisteredUserPostModel()
    console.log(post)
    res.send({
      status: 'ok',
      data: {
        post
      }
    })
  } catch (error) {
    next(error)
  }
}
