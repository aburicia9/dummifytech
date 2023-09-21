// Importamos la base de datos.
import { getDb } from '../../db/getDb.js'

// Funcion que crea la conexion con la base de datos.

export const selectAllPostsModel = async () => {
  let connection
  try {
    connection = await getDb()

    const [posts] = await connection.query(`
      SELECT p.id, p.title, p.post, p.image, p.id_user, u.username, u.avatar
      FROM posts as p
      INNER JOIN users u on u.id = p.id_user  
    `)
    console.log(posts)
    return posts
  } finally {
    if (connection) connection.release()
  }
}
