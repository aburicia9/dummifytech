// Importamos la base de datos.
import { getDb } from '../../db/getDb.js'

// Funcion que crea la conexion con la base de datos.

export const selectPostByIdModel = async (userId, postId) => {
  let connection
  try {
    connection = await getDb()

    const [[post]] = await connection.query(`
      SELECT  p.title, p.post, p.image
      FROM posts as p
      WHERE p.id = ? AND p.id_user = ?
    `, [postId, userId])
    return post
  } finally {
    if (connection) connection.release()
  }
}