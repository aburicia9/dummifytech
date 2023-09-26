import { newCommentController } from '../controllers/comments/newCommentController.js'
import { Router } from 'express'
import { authUserController } from '../middlewares/authUserController.js'
import { deleteCommentsController } from '../controllers/comments/deleteCommentsController.js'
import { editCommentController } from '../controllers/comments/editCommentController.js'
import { getAllCommentsController } from '../controllers/comments/getAllCommentsController.js'
import { newLikeController } from '../controllers/posts/newLikeController.js'


const router = Router()

// ------------------------------------------------------------------------------------------------
//                                        RUTAS DE COMENTARIOS
// ------------------------------------------------------------------------------------------------

// Mostramos los comentarios de un post

router.get('/posts/:postId/comments', authUserController, getAllCommentsController)

// Crear comentario

router.post('/posts/:postId/comments', authUserController, newCommentController)

// Crear respuesta de comentario

router.post('/posts/:postId/comments/:commentId', authUserController, newCommentController)

// Eliminar comentario

router.delete('/posts/:postId/comments/:commentId', authUserController, deleteCommentsController)

// Editar un comentario

router.put('/posts/:postId/comments/:commentId', authUserController, editCommentController)

export default router
