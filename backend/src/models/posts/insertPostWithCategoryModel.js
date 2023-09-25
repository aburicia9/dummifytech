import { getDb } from '../../db/getDb.js'

export const insertPostWithCategoryModel = async (title, post, imgName, categoryId, userId) => {
  let connection
  try {
    connection = await getDb()
    const [publicationCat] = await connection.query(
      `SELECT id
      FROM categories
      WHERE id_category = ? `

    )
    for (const publication of publicationCat) {
      const [publication] = await connection.query(
          `INSERT INTO posts (title, post, image, id_category AS categoryId , id_user AS userId)
          VALUES (?, ?, ?, ?, ?)
          WHERE id_category = ${publicationCat}`,
          [title, post, imgName, categoryId, userId]

      )
      publicationCat.publication = publication
    }
  } catch (error) {

  }
}
