// Importamos la base de datos.
import { getDb } from '../../db/getDb.js'

// Funcion que crea la conexion con la base de datos.
export const selectCommentModel = async (postId) => {
  let connection
  try {
    connection = await getDb()

    const [[comments]] = await connection.query(`
      SELECT c.comment, u.username created_at as createdAt
      FROM comments c
      INNER JOIN users u ON u.id = c.id_user
      INNER JOIN posts p ON p.id = c.id_post 
      WHERE c.id_post = ?;
    `)
    console.log(comments)
    return comments
  } finally {
    if (connection) connection.release()
  }
}
