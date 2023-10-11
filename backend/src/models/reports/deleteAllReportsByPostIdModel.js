import { getDb } from '../../db/getDb.js'
import { notFoundError } from '../../services/errorService.js'

export const deleteAllReportsByPostIdModel = async (postId) => {
  let connection
  try {
    connection = await getDb()

    const [report] = await connection.query(
      'SELECT id FROM reports WHERE id_post = ?',
      [postId]
    )

    if (report.length < 1) {
      notFoundError('report')
    }

    await connection.query(
      'DELETE FROM reports WHERE id_post = ?',
      [postId]
    )
  } finally {
    if (connection) connection.release()
  }
}
