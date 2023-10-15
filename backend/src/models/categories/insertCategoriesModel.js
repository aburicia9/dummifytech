import { getDb } from '../../db/getDb.js'

export const insertCategoriesModel = async (subCategories, name, description, imgName) => {
  let connection
  try {
    connection = await getDb()
    const [categories] = await connection.query(`
      INSERT INTO categories
      (id_category_parent, name, description, image)
      VALUES(?, ?, ?, ?)`,
    [subCategories, name, description, imgName]
    )
    return categories
  } finally {
    if (connection) connection.release()
  }
}
