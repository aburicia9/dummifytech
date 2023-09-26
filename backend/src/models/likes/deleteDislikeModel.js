import { getDb } from '../../db/getDb.js'
import { notFoundError } from '../../services/errorService.js'

export const deleteDislikeModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()

    const [dislikes] = await connection.query(
      'SELECT id FROM dislikes WHERE id_post = ? AND id_user = ?',
      [postId, userId]
    )

    if (dislikes.length < 1) {
      notFoundError('dislike')
    }

    await connection.query(
      'DELETE FROM dislikes WHERE id_post = ? AND id_user = ?',
      [postId, userId]
    )
  } finally {
    if (connection) connection.release()
  }
}
