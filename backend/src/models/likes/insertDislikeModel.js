import { getDb } from '../../db/getDb.js'
import { dislikeAlreadyExistsError } from '../../services/errorService.js'

export const insertDislikeModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()
    const [dislikes] = await connection.query(
      'SELECT id FROM dislikes WHERE id_post = ? AND id_user = ?',
      [postId, userId]
    )

    if (dislikes.length > 0) {
      dislikeAlreadyExistsError()
    }

    await connection.query(
      'INSERT INTO dislikes(id_post, id_user) VALUES (?, ?)',
      [postId, userId]
    )
  } finally {
    if (connection) connection.release()
  }
}
