import { getDb } from '../../db/getDb.js'
import { dislikeAlreadyExistsError } from '../../services/errorService.js'
import { deleteLikeModel } from './deleteLikeModel.js'
import { getDislikeModel } from './getDislikeModel.js'
import { getLikeModel } from './getLikeModel.js'

export const insertDislikeModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()

    const dislikes = await getDislikeModel(postId, userId)

    if (dislikes.length > 0) {
      dislikeAlreadyExistsError()
    }

    const likes = await getLikeModel(postId, userId)

    if (likes.length > 0) {
      deleteLikeModel(postId, userId)
    }

    await connection.query(
      'INSERT INTO dislikes(id_post, id_user) VALUES (?, ?)',
      [postId, userId]
    )
  } finally {
    if (connection) connection.release()
  }
}
