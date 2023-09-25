import { getDb } from "../../db/getDb.js"


export const insertPostWithCategoryModel = async () => {
  let connection
  try {
    connection = await getDb()

    const [publication] =await connection.query (
      ``
    )
  } catch (error) {
    
  }
}