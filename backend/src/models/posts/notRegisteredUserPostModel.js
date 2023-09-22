import { getDb } from '../../db/getDb.js'

export const notRegisteredUserPostModel = async () => {
  let connection
  try {
    connection = await getDb()

    const [post] = await connection.query(`
      SELECT p.id, p.title, p.post, p.image, p.id_user
      FROM posts p 
      ORDER BY RAND() LIMIT 1
      `)

    return post
  } finally {
    if (connection) connection.release()
  }
}
