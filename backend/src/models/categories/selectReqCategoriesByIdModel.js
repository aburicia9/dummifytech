import { getDb } from '../../db/getDb.js'

export const selectReqCategoriesByIdModel = async (requestCategoryId) => {
  let connection
  try {
    connection = await getDb()

    const [[reqcategories]] = await connection.query(
      `SELECT u.username , u.email, rc.name_category as nameCategory
      FROM req_categories rc
      INNER join users u on u.id  = rc.id_user 
      WHERE rc.id = ?;
      `, [requestCategoryId])

    return reqcategories
  } finally {
    if (connection) connection.release()
  }
}
