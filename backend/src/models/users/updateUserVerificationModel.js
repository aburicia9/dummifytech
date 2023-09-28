import { getDb } from '../../db/getDb.js'

export const updateUserVerificationModel = async (email, verificationCode) => {
  let connection

  try {
    connection = await getDb()

    await connection.query(`
        UPDATE users 
        SET status = true, verification_code = ""
        WHERE email = ? and verification_code = ? 
    `, [email, verificationCode])
  } finally {
    if (connection) connection.release()
  }
}
