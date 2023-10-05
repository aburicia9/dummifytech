import { selectRandomPostModel } from '../../models/posts/selectRandomPostModel.js'

export const getRandomPostController = async (req, res, next) => {
  try {
    const posts = await selectRandomPostModel()

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
