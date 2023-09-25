// Importamos la base de datos.
import { getDb } from '../../db/getDb.js'

// Funcion que crea la conexion con la base de datos.

export const selectAllPostsModel = async () => {
  let connection
  try {
    connection = await getDb()

    const [posts] = await connection.query(`
      SELECT p.id, p.title, p.post, p.image, u.username, u.avatar, c.name as nameCategory, p.created_at as createdAt
      FROM posts as p
      INNER JOIN users u on u.id = p.id_user  
      INNER JOIN categories c on c.id = p.id_category
    `)
    for (const post of posts) {
      const [[{ countLikes }]] = await connection.query(`
      SELECT COUNT(id) AS countLikes
      FROM likes
      WHERE id_post = ${post.id}
    `)

      const [[{ countComments }]] = await connection.query(`
      SELECT COUNT(id) AS countComments
      FROM comments
      WHERE id_post = ${post.id}
    `)
      post.countLikes = countLikes
      post.countComments = countComments
    }

    return posts
  } finally {
    if (connection) connection.release()
  }
}
