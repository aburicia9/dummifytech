import { getDb } from '../../db/getDb.js'

export const getIdSubcategoryModel = async (categoryId, userId) => {
  let connection
  try {
    connection = await getDb()

    const [posts] = await connection.query(`
    SELECT p.id, p.title, p.post, p.image, u.id, u.username, u.avatar, c.id , c.name as nameCategory, p.created_at as createdAt
      FROM posts as p
      INNER JOIN users u on u.id = p.id_user  
      INNER JOIN categories c on c.id = p.id_category
      WHERE c.id = ?
    `, [categoryId])

    console.log(categoryId)

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

      post.countLikes = countLikes
      post.countComments = countComments
      post.ownerLikes = ownerLikes
    }

    return posts
  } catch (error) {
    if (connection) connection.release()
  }
}
