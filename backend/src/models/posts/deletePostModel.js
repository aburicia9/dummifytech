import { getDb } from '../../db/getDb.js'
import { notFoundError, unauthorizedUserError } from '../../services/errorService.js'
import { UPLOADS_DIRS } from '../../utils/constants.js'
import { deletePhoto } from '../../utils/deletePhoto.js'
import { selectUserByIdModel } from '../users/selectUserByIdModel.js'

// Funcion modelo para eliminar posts.
export const deletePostModel = async (postId, userId) => {
  let connection
  try {
    connection = await getDb()

    const [posts] = await connection.query(
      'SELECT id_user FROM posts WHERE id = ?',
      [postId]
    )

    if (posts.length < 1) {
      notFoundError('post')
    }
    const user = await selectUserByIdModel(userId)

    if (posts[0].id_user !== userId && user.role === 'normal') {
      unauthorizedUserError()
    }

    const [imageName] = await connection.query('SELECT image FROM posts WHERE id = ?', [postId])

    if (imageName.length > 0 && imageName[0].image !== null) {
      await deletePhoto(imageName[0].image, UPLOADS_DIRS.POST)
    }

    await connection.query('DELETE FROM posts WHERE id = ?', [postId])
  } finally {
    if (connection) connection.release()
  }
}
