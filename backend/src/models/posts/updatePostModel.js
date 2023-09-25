import { getDb } from '../../db/getDb.js'
import { notFoundError, unauthorizedUserError } from '../../services/errorService.js'

export const updatePostModel = async (postId, post, title, userId, imgName) => {
  let connection

  try {
    connection = await getDb()
    const [posts] = await connection.query(`
    SELECT id_user FROM posts WHERE id = ?
    `, [postId])

    if (posts.length < 1) {
      notFoundError('post')
    }

    if (posts[0].id_user !== userId) {
      unauthorizedUserError()
    }
    await connection.query(`
    UPDATE posts 
    SET post = ?, 
    SET title = ?,
    SET image = ?
    WHERE id = ?
`, [post, title, imgName, postId])
  } finally {
    if (connection) connection.release()
  }
}
