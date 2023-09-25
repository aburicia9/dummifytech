import { getDb } from '../../db/getDb.js'
import { notFoundError, unauthorizedUserError } from '../../services/errorService.js'

export const updateCommentModel = async (commentId, comment, userId) => {
  let connection
  console.log('Adios')
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
        UPDATE comments 
        SET comment = ?
        WHERE id = ?
    `, [comment, commentId])
  } finally {
    if (connection) connection.release()
  }
}
