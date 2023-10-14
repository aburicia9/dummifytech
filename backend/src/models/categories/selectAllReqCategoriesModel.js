import { getDb } from '../../db/getDb.js'

export const selectAllReqCategoriesModel = async () => {
  let connection
  try {
    connection = await getDb()
    const [categories] = await connection.query(
      `SELECT rc.id, u.username, u.avatar, name_category, reason, req_status, accepted, c.name 
      FROM req_categories rc
      inner join categories c on c.id  = rc.id_category_parent
      inner join users u on u.id = rc.id_user 
      WHERE req_status = 0;
      `
    )

    return categories
  } finally {
    if (connection) connection.release()
  }
}
