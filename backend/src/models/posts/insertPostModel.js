// Importamos la base de datos
import { getDb } from '../../db/getDb.js'

// Función que va a insertar la informacion en la base de datos.
export const insertPostModel = async (title, post, img, userId, categoryId) => {
  let connection

  try {
    connection = await getDb()

    const [publication] = await connection.query(`
      INSERT INTO posts (title, post, image, id_category, id_user)
      VALUES (?, ?, ?, ?, ?)`,
    [title, post, img, categoryId, userId]
    )

    return publication.insertId
  } finally {
    if (connection) connection.release()
  }
}
