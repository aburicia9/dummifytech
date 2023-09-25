import { getDb } from '../../db/getDb.js'
import { UPLOADS_DIRS } from '../../utils/constants.js'
import { deletePhoto } from '../../utils/deletePhoto.js'

export const deleteCategoryModel = async (categoryId) => {
  let connection
  try {
    connection = await getDb()

    const [imgName] = await connection.query(
      'SELECT image FROM categories WHERE id = ?',
      [categoryId]
    )

    if (imgName.length > 0 && imgName[0].image !== null) {
      await deletePhoto(imgName[0].image, UPLOADS_DIRS.CATEGORY)
    }
    await connection.query(
      'DELETE from categories WHERE id = ?',
      [categoryId]
    )
  } finally {
    if (connection) connection.release()
  }
}
