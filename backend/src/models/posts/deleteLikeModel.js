import { getDb } from '../../db/getDb.js'
import { notFoundError } from '../../services/errorService.js'

// Función modelo donde se quita el like.
export const deleteLikeModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()

    const [likes] = await connection.query(
      'SELECT id FROM likes WHERE id_post = ? AND id_user = ?',
      [postId, userId]
    )

    if (likes.length < 1) {
      notFoundError('like')
    }

    await connection.query(
      'DELETE FROM likes WHERE id_post = ? AND id_user = ?',
      [postId, userId]
    )
  } finally {
    if (connection) connection.release()
  }
}
