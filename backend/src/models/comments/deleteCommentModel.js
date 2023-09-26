import { getDb } from '../../db/getDb.js'
import { notFoundError, unauthorizedUserError } from '../../services/errorService.js'

export const deleteCommentModel = async (commentId, userId) => {
  let connection
  try {
    connection = await getDb()

    const [comments] = await connection.query(`
    SELECT id_user FROM comments WHERE id = ?
    `, [commentId])

    if (comments.length < 1) {
      notFoundError('comentario')
    }
    if (comments[0].id_user !== userId) {
      unauthorizedUserError()
    }

    await connection.query(`
    DELETE FROM comments WHERE id =?`, [commentId])
  } finally {
    if (connection) connection.release()
  }
}
