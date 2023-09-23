import { getDb } from '../../db/getDb.js'

export const notRegisteredUserPostModel = async () => {
  let connection
  try {
    connection = await getDb()

    const [post] = await connection.query(`
      SELECT p.id, p.title, p.post, p.image, u.username , p.created_at
      FROM posts p 
      inner join users u on u.id = p.id_user  
      ORDER BY RAND() LIMIT 1
    

      `)
    const [[{ countLike }]] = await connection.query(`
      SELECT COUNT(id) AS countLike
      FROM likes 
      WHERE id_post = ${post[0].id}`
    )

    return { post, countLike }
  } finally {
    if (connection) connection.release()
  }
}
