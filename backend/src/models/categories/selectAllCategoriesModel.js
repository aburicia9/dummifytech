import { getDb } from '../../db/getDb.js'

export const selectAllCategoriesModel = async () => {
  let connection
  try {
    connection = await getDb()
    const [categories] = await connection.query(`
      SELECT id, id_categories_parent, name, description, image
      FROM categories
      WHERE id_categories_parent is null
      `)

    for (const category of categories) {
      const [subcategories] = await connection.query(`
        SELECT id, name, description, image
        from categories
        WHERE id_categories_parent = ${category.id}
        `)
      category.subcategories = subcategories
    }
    return categories
  } finally {
    if (connection) connection.release()
  }
}
