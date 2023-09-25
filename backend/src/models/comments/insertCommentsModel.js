import { getDb } from '../../db/getDb.js'

export const insertCommentsModel = async (commentId = null, comment, userId, postId) => {
  let connection

  try {
    connection = await getDb()

    await connection.query(`
    INSERT INTO comments
    (id_comment_parent, comment, id_user, id_post)
    VALUES(?, ?, ?, ?);
    `,
    [commentId, comment, userId, postId]
    )

    // return insertComment.insertId
  } finally {
    if (connection) connection.release()
  }
}
