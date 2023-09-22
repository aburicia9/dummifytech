import { getDb } from '../../db/getDb.js'
import { unauthorizedUserError } from '../../services/errorService.js'

// Funcion modelo para eliminar posts.
export const deletePostModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()

    const [posts] = await connection.query(
      'SELECT id_user FROM posts WHERE id = ?',
      [postId]
    )

    console.log(posts)
    if (posts[0].id_user !== userId) {
      unauthorizedUserError()
    }

    await connection.query('DELETE FROM likes WHERE id_post = ?',
      [postId])

    await connection.query('DELETE FROM posts WHERE id = ?', [postId])
  } finally {
    if (connection) connection.release()
  }
}
