import { getDb } from '../../db/getDb.js'
import { notFoundError } from '../../services/errorService.js'

export const deleteUserModel = async (userId) => {
  let connection
  try {
    connection = await getDb()

    const [users] = await connection.query(`
    SELECT id, role FROM users WHERE id = ?
    `, [userId])

    if (users.length < 1) {
      notFoundError('usuario')
    }
    await connection.query(`
    DELETE FROM users WHERE id = ?`, [userId])
  } finally {
    if (connection) connection.release()
  }
}
