import { getDb } from '../../db/getDb.js'

export const selectAllReportModel = async () => {
  let connection
  try {
    connection = await getDb()

    const [reports] = await connection.query(`
      SELECT r.id_post, p.title, r.id_comment, c.comment, u.username 
      FROM reports AS r
      LEFT JOIN posts p ON p.id = r.id_post 
      LEFT JOIN comments c ON c.id = r.id_comment 
      LEFT JOIN users u ON u.id = r.id_user 
    `)

    return reports
  } finally {
    if (connection) connection.release()
  }
}
