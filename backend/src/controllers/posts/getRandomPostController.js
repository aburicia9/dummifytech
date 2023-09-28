import { selectRandomPostModel } from '../../models/posts/selectRandomPostModel.js'

export const getRandomPostController = async (req, res, next) => {
  try {
    const post = await selectRandomPostModel()

    res.send({
      status: 'ok',
      data: post
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
