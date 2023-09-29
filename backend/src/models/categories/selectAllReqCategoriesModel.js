import { getDb } from '../../db/getDb.js'

export const selectAllReqCategoriesModel = async () => {
  let connection
  try {
    connection = await getDb()
    const [categories] = await connection.query(
      `SELECT id, id_user, name_category, reason, req_status, accepted
      FROM req_categories
      WHERE req_status = 1;
      `
    )

    return categories
  } finally {
    if (connection) connection.release()
  }
}
