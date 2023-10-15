import { newCommentController } from '../controllers/comments/newCommentController.js'
import { Router } from 'express'
import { authUserController } from '../middlewares/authUserController.js'
import { deleteCommentsController } from '../controllers/comments/deleteCommentsController.js'
import { getAllCommentsController } from '../controllers/comments/getAllCommentsController.js'

const router = Router()

// ------------------------------------------------------------------------------------------------
//                                        RUTAS DE COMENTARIOS
// ------------------------------------------------------------------------------------------------
// #region comentarios
// Mostramos los comentarios de un post

router.get('/posts/:postId/comments', authUserController, getAllCommentsController)

// Crear comentario

router.post('/posts/:postId/comments', authUserController, newCommentController)

// Crear respuesta de comentario

router.post('/posts/:postId/comments/:commentId', authUserController, newCommentController)

// Eliminar comentario

router.delete('/posts/:postId/comments/:commentId', authUserController, deleteCommentsController)

// #endregion comentarios

export default router
