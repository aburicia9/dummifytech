import { getDb } from '../../db/getDb.js'
import { notFoundError } from '../../services/errorService.js'

export const updateUserRoleModel = async (role, userId) => {
  let connection
  try {
    connection = await getDb()
    const [user] = await connection.query(`
    SELECT id 
    FROM users
    WHERE id = ? 
    `, [userId])
    if (user.length < 1) {
      throw notFoundError('user')
    }

    await connection.query(`
    UPDATE users
    SET role = ?
    WHERE id = ?
    `, [role, userId])
  } finally {
    if (connection) connection.release()
  }
}
