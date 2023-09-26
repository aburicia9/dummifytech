import { getDb } from '../../db/getDb.js'
import { likeAlreadyExistsError } from '../../services/errorService.js'

// Funcion donde se dan likes
export const insertLikesModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()

    const [likes] = await connection.query(
      'SELECT id FROM likes WHERE id_post = ? AND id_user = ?',
      [postId, userId]
    )

    if (likes.length > 0) {
      likeAlreadyExistsError()
    }

    await connection.query(
      'INSERT INTO likes(id_post, id_user) VALUES (?, ?)',
      [postId, userId]
    )
  } finally {
    if (connection) connection.release()
  }
}
