import { getDb } from '../../db/getDb.js'

export const countLikeModel = async (postId) => {
  let connection
  try {
    connection = await getDb()

    await connection.query(`
      SELECT COUNT(id) AS count_likes
      FROM likes 
      WHERE id_post = ?`, [postId]
    )
  } finally {
    if (connection) connection.release()
  }
}
