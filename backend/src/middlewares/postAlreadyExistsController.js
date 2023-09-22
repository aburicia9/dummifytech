import { getDb } from '../db/getDb.js'
import { notFoundError } from '../services/errorService.js'

// Funcion que comprueba la existencia del post.
export const postAlreadyExistsController = async (req, res, next) => {
  let connection
  try {
    connection = await getDb()

    const { postId } = req.params

    const [posts] = await connection.query(
      'SELECT id FROM posts WHERE id = ?',
      [postId]
    )

    if (posts.length < 1) {
      notFoundError('post')
    }

    next()
  } catch (error) {
    next(error)
  } finally {
    if (connection) connection.release()
  }
}
