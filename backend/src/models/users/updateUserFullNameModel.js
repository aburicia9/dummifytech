import { getDb } from '../../db/getDb.js'

export const updateUserFullNameModel = async (fullName, userId) => {
  let connection
  try {
    connection = await getDb()
    await connection.query(`
        UPDATE users 
        SET full_name = ?
        WHERE id = ?
    `, [fullName, userId.id])
  } finally {
    if (connection) connection.release()
  }
}
