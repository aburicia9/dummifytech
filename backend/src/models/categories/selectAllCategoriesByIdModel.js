import { getDb } from '../../db/getDb.js'

export const selectAllCategoriesByIdModel = async (categoryId) => {
  let connection
  try {
    connection = await getDb()
    const [categories] = await connection.query(`
      SELECT id, id_categories_parent, name, description, image
      FROM categories
      WHERE id = ?
      `, [categoryId])

    return { categories }
  } finally {
    if (connection) connection.release()
  }
}
