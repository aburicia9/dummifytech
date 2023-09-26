import { Router } from 'express'
import { authUserController } from '../middlewares/authUserController.js'
import { postAlreadyExistsController } from '../middlewares/postAlreadyExistsController.js'
import { newLikeController } from '../controllers/likes/newLikeController.js'
import { newDislikeController } from '../controllers/likes/newDislikeController.js'
import { deleteLikeController } from '../controllers/likes/deleteLikeController.js'
import { deleteDislikeController } from '../controllers/likes/deleteDislikeController.js'

const router = Router()

// ------------------------------------------------------------------------------------------------
//                                        RUTAS DE LIKES
// ------------------------------------------------------------------------------------------------
// #region like
// Dar like a una publicación
router.post('/posts/:postId/likes', authUserController, postAlreadyExistsController, newLikeController)

// Eliminar like de una publicación
router.delete('/posts/:postId/likes', authUserController, postAlreadyExistsController, deleteLikeController)
// #endregion like
// #region dislike
// Dar Dislike a una publicación
router.post('/posts/:postId/dislikes', authUserController, postAlreadyExistsController, newDislikeController)

// Eliminar dislike de una publicación
router.delete('/posts/:postId/dislikes', authUserController, postAlreadyExistsController, deleteDislikeController)
// #endregion dislike

export default router
