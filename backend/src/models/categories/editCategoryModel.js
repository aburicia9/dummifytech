import { getDb } from '../../db/getDb.js'

export const editCategoryModel = async (name, description, imgName, categoryId) => {
  let connection
  try {
    connection = await getDb()
    await connection.query(`
    UPDATE categories
    SET name= ?, description= ?, image= ?
    where id= ?`,

    [name, description, imgName, categoryId]

    )
  } finally {
    if (connection) connection.release()
  }
}
