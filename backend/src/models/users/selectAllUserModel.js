import { getDb } from '../../db/getDb.js'

export const selectAllUserModel = async () => {
  let connection
  try {
    connection = await getDb()

    const [users] = await connection.query(`
      SELECT id, username, role, avatar
      FROM users
    `)

    return users
  } finally {
    if (connection) connection.release()
  }
}
