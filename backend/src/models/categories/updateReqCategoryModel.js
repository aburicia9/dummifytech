import { getDb } from '../../db/getDb.js'

export const updateReqCategoryModel = async (statusReq, accepted, requestCategoryId) => {
  let connection
  try {
    connection = await getDb()
    const [categories] = await connection.query(
      `
      UPDATE req_categories
      SET req_status = ?, accepted = ? 
      WHERE id = ?;
      `, [statusReq, accepted, requestCategoryId])
    return categories
  } finally {
    if (connection) connection.release()
  }
}
