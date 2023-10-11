import { getDb } from '../../db/getDb.js'

export const selectAllReportModel = async () => {
  let connection
  try {
    connection = await getDb()

    const [reports] = await connection.query(`
    SELECT r.id as idReport, r.id_post as idPost, p.title, r.id_comment as idComment, c.comment, u.username, p.created_at as createdAt, u.avatar, countPostReports
    FROM reports AS r
    LEFT JOIN posts p ON p.id = r.id_post 
    LEFT JOIN comments c ON c.id = r.id_comment 
    LEFT JOIN users u ON u.id = r.id_user
    LEFT JOIN (
      SELECT id_post, COUNT(id) AS countPostReports
      FROM reports
      WHERE id_comment IS NULL
      GROUP BY id_post
      ) AS subq ON r.id_post = subq.id_post
    ORDER BY countPostReports DESC
    `)
    for (const report of reports) {
      const [[{ countPostReports }]] = await connection.query(`
      SELECT COUNT(id) AS countPostReports
      FROM reports
      WHERE id_post = ${report.idPost} AND id_comment IS NULL
    `)
      const [[{ countCommentreports }]] = await connection.query(`
      SELECT COUNT(id) AS countCommentreports
      FROM reports
      WHERE id_post = ${report.idPost} AND id_comment = ${report.idComment}
    `)
      report.countPostReports = countPostReports
      report.countCommentreports = countCommentreports
    }
    return reports
  } finally {
    if (connection) connection.release()
  }
}
