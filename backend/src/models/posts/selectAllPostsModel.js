// Importamos la base de datos.
import { getDb } from '../../db/getDb.js'

// Funcion que crea la conexion con la base de datos.

export const selectAllPostsModel = async () => {
  let connection
  try {
    connection = await getDb()

    const [[post]] = await connection.query(`
      SELECT p.id, p.title, p.post, p.image, u.username, u.avatar, c.name as nameCategory, p.created_at as createdAt
      FROM posts as p
      INNER JOIN users u on u.id = p.id_user  
      INNER JOIN categories c on c.id = p.id_category
    `)

    const [[{ countLikes }]] = await connection.query(`
    SELECT COUNT(id) AS countLikes
      FROM likes
      WHERE id_post = ${post.id}
    `)
    const [[{ countComments }]] = await connection.query(`SELECT COUNT(id) AS countComments
    FROM comments
    WHERE id_post = ${post.id}
    `)

    const postDetail = { ...post, countLikes, countComments }
    return postDetail
  } finally {
    if (connection) connection.release()
  }
}
