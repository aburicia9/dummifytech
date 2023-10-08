import { getDb } from '../../db/getDb.js'
import { notFoundError } from '../../services/errorService.js'

export const selectUserByIdModel = async (userId) => {
  let connection

  try {
    connection = await getDb()

    const [users] = await connection.query(
      'SELECT id, full_name as fullName, username, email, avatar, role FROM users WHERE id = ?',
      [userId]
    )
    if (users.length < 1) {
      notFoundError('user')
    }

    return users[0]
  } finally {
    if (connection) connection.release()
  }
}
