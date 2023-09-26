import { getDb } from '../../db/getDb.js'
import { reportAlreadyExistsError } from '../../services/errorService.js'

export const insertReportModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()

    const [reports] = await connection.query(
      'SELECT id FROM reports WHERE id_post = ? AND id_user = ?',
      [postId, userId]
    )

    if (reports.length > 0) {
      reportAlreadyExistsError()
    }

    await connection.query(
      'INSERT INTO reports(id_post, id_user) VALUES (?, ?)',
      [postId, userId]
    )
  } finally {
    if (connection) connection.release()
  }
}
