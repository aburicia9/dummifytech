// Importamos la conexion a la base de datos.
import { getDb } from '../../db/getDb.js'

// Funcion que se conecta y actualiza la base de datos.
export const updateAvatarModel = async (avatarName, userId) => {
  let connection

  try {
    connection = await getDb()

    await connection.query(`
    UPDATE users 
    SET avatar = ?
    WHERE id = ?`, [
      avatarName,
      userId.id
    ])
  } finally {
    if (connection) connection.release()
  }
}
