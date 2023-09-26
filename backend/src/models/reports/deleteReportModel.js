import { getDb } from '../../db/getDb.js'
import { notFoundError } from '../../services/errorService.js'

export const deleteReportModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()

    const [report] = await connection.query(
      'SELECT id FROM reports WHERE id_post = ? AND id_user = ?',
      [postId, userId]
    )

    if (report.length < 1) {
      notFoundError('report')
    }

    await connection.query(
      'DELETE FROM reports WHERE id_post = ? AND id_user = ?',
      [postId, userId]
    )
  } finally {
    if (connection) connection.release()
  }
}
