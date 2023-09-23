import { getDb } from '../../db/getDb.js'
import bcrypt from 'bcrypt'

export const updateUserPasswordModel = async (password, userId) => {
  let connection
  //   console.log(userId.id)
  try {
    connection = await getDb()
    
    const hashedPass = await bcrypt.hash(password, 10)
    await connection.query(`
        UPDATE users 
        SET password = ?
        WHERE id = ?
    `, [hashedPass, userId.id])
  } finally {
    if (connection) connection.release()
  }
}
