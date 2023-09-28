// Importamos la base de datos.
import { getDb } from '../../db/getDb.js'

// Funcion que crea la conexion con la base de datos.
export const selectAllCommentModel = async (commentId) => {
  let connection
  try {
    connection = await getDb()

    const [[comment]] = await connection.query(`
      SELECT c.comment
      FROM comments as c
      WHERE c.id = ?;
    `, [commentId])
    return comment
  } finally {
    if (connection) connection.release()
  }
}
