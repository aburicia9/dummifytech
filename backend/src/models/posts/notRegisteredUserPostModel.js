import { getDb } from '../../db/getDb.js'

export const notRegisteredUserPostModel = async () => {
  let connection
  try {
    connection = await getDb()

    // let postdetail = {}

    const [[post]] = await connection.query(`
      SELECT p.id, p.title, p.post, p.image, u.username , p.created_at
      FROM posts p 
      inner join users u on u.id = p.id_user
      ORDER BY RAND() LIMIT 1
      `)

    const [[{ countLikes }]] = await connection.query(`
      SELECT COUNT(id) AS countLikes
      FROM likes
      WHERE id_post = ${post.id}`
    )
    const [[{ countComments }]] = await connection.query(`
    SELECT COUNT(id) AS countComments
    FROM comments
    WHERE id_post = ${post.id}
    `)

    const postDetail = { ...post, countLikes, countComments }

    return postDetail
  } finally {
    if (connection) connection.release()
  }
}
