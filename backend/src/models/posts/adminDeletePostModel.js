import { getDb } from "../../db/getDb.js";

export const adminDeletePostModel = async (userId, postId, role){
  let connection
  try {
    connection = await getDb()
    
  } catch (error) {
    
  }
}