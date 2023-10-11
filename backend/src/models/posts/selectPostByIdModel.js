// Importamos la base de datos.
import { getDb } from '../../db/getDb.js'
import { notFoundError } from '../../services/errorService.js'

// Funcion que crea la conexion con la base de datos.

export const selectPostByIdModel = async (postId, userId) => {
  let connection

  try {
    connection = await getDb()

    const [posts] = await connection.query(`
      SELECT p.id, p.title, p.post, p.image, u.username, u.avatar, c.name as nameCategory, p.created_at as createdAt, p.modified_at as modifiedAt
      FROM posts as p
      INNER JOIN users u on u.id = p.id_user  
      INNER JOIN categories c on c.id = p.id_category
      WHERE p.id = ?
      ORDER BY createdAt DESC 
    `, [postId])

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

      const [[{ ownerLikes }]] = await connection.query(`
    SELECT COUNT(id) AS ownerLikes
    FROM likes
    WHERE id_post = ${post.id} AND id_user = ${userId}
  `)

      const [[{ ownerDislikes }]] = await connection.query(`
    SELECT COUNT(id) AS ownerDislikes
    FROM dislikes
    WHERE id_post = ${post.id} AND id_user = ${userId}
  `)
      const [[{ ownerReports }]] = await connection.query(`
      SELECT COUNT(id) AS ownerReports
      FROM reports
      WHERE id_post = ${post.id} AND id_user = ${userId}
  `)

      post.countLikes = countLikes
      post.countComments = countComments
      post.ownerLikes = ownerLikes
      post.ownerDislikes = ownerDislikes
      post.ownerReports = ownerReports
    }

    if ([posts]?.length < 1) {
      notFoundError('post')
    }

    return posts
  } finally {
    if (connection) connection.release()
  }
}
