import { getDb } from '../../db/getDb.js'

export const getDislikeModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()
    const [dislikes] = await connection.query(
      'SELECT id FROM dislikes WHERE id_post = ? AND id_user = ?',
      [postId, userId]
    )

    return dislikes
  } finally {
    if (connection) connection.release()
  }
}
