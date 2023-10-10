import { getDb } from '../../db/getDb.js'
import { categoryNameAlreadyExistsError } from '../../services/errorService.js'

export const insertReqCategoryModel = async (userId, categoryParentId, categoryName, categoryReason) => {
  let connection
  try {
    connection = await getDb()

    const [category] = await connection.query(`
      SELECT id 
      FROM req_categories
      WHERE name_category = ?
    `, [categoryName])

    if (category.length > 0) {
      categoryNameAlreadyExistsError()
    }

    const [categories] = await connection.query(`
      INSERT INTO req_categories
      (id_user, id_category_parent, name_category, reason)
      VALUES(?, ?, ?, ?)`,
    [userId, categoryParentId, categoryName, categoryReason]
    )

    return categories
  } finally {
    if (connection) connection.release()
  }
}
