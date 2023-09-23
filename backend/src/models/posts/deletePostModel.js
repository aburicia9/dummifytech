import { getDb } from '../../db/getDb.js'
import { unauthorizedUserError } from '../../services/errorService.js'
import { UPLOADS_DIRS } from '../../utils/constants.js'
import { deletePhoto } from '../../utils/deletePhoto.js'

// Funcion modelo para eliminar posts.
export const deletePostModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()

    const [posts] = await connection.query(
      'SELECT id_user FROM posts WHERE id = ?',
      [postId]
    )

    if (posts[0].id_user !== userId) {
      unauthorizedUserError()
    }

    const [imageName] = await connection.query('SELECT image FROM posts WHERE id = ?', [postId])

    if (imageName.length > 0) {
      await deletePhoto(imageName[0].image, UPLOADS_DIRS.POST)
    }

    // await connection.query('DELETE FROM likes WHERE id_post = ?',
    //   [postId])

    await connection.query('DELETE FROM posts WHERE id = ?', [postId])
  } finally {
    if (connection) connection.release()
  }
}
