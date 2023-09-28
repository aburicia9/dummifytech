import { getDb } from '../../db/getDb.js'
import { likeAlreadyExistsError } from '../../services/errorService.js'
import { deleteDislikeModel } from './deleteDislikeModel.js'
import { getDislikeModel } from './getDislikeModel.js'
import { getLikeModel } from './getLikeModel.js'

// Funcion donde se dan likes
export const insertLikesModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()

    const likes = await getLikeModel(postId, userId)

    if (likes.length > 0) {
      likeAlreadyExistsError()
    }

    const dislikes = await getDislikeModel(postId, userId)

    if (dislikes.length > 0) {
      deleteDislikeModel(postId, userId)
    }

    await connection.query(
      'INSERT INTO likes(id_post, id_user) VALUES (?, ?)',
      [postId, userId]
    )
  } finally {
    if (connection) connection.release()
  }
}
