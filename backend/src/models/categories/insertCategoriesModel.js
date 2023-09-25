import { getDb } from '../../db/getDb.js'

export const insertCategoriesModel = async (categoryId, name, description, imgName) => {
  let connection
  try {
    connection = await getDb()
    const [categories] = await connection.query(`
      INSERT INTO categories
      (id, name, description, image)
      VALUES(?, ?, ?, ?)`,
    [categoryId, name, description, imgName]
    )
    return categories
  } finally {
    if (connection) connection.release()
  }
}
