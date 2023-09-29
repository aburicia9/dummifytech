import { getDb } from '../../db/getDb.js'
import { invalidCredentialsError } from '../../services/errorService.js'

export const selectUserByEmailModel = async (email) => {
  let connection

  try {
    connection = await getDb()

    const [users] = await connection.query(
      'SELECT id, username, full_name, password, role, verification_code, status FROM users WHERE email =?',
      [email]
    )
    if (users.length < 1) {
      invalidCredentialsError()
    }

    return users[0]
  } finally {
    if (connection) connection.release()
  }
}
