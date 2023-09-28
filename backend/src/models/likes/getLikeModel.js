import { getDb } from '../../db/getDb.js'

export const getLikeModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()

    const [likes] = await connection.query(
      'SELECT id FROM likes WHERE id_post = ? AND id_user = ?',
      [postId, userId]
    )

    return likes
  } finally {
    if (connection) connection.release()
  }
}
