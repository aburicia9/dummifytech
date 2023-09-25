import { getDb } from '../../db/getDb.js'

export const selectAllCategoriesModel = async () => {
  let connection
  try {
    connection = await getDb()
    const [categories] = await connection.query(
      `SELECT id, id_categories_parent, name, description, image
      FROM categories
      `
    )
    return categories
  } finally {
    if (connection) connection.release()
  }
}
