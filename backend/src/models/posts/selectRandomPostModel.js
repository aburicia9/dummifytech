import { getDb } from '../../db/getDb.js'

export const selectRandomPostModel = async () => {
  let connection
  try {
    connection = await getDb()

    // let postdetail = {}

    const [posts] = await connection.query(`
      SELECT p.id, p.title, p.post, p.image, u.username, u.avatar , p.created_at as createdAt, c.name as nameCategory
      FROM posts p 
      INNER JOIN users u ON u.id = p.id_user
      INNER JOIN categories c ON c.id = p.id_category
      ORDER BY RAND() LIMIT 1
      `)
    for (const post of posts) {
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
      post.countLikes = countLikes
      post.countComments = countComments
    }

    return posts
  } finally {
    if (connection) connection.release()
  }
}
