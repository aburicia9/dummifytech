import { newCommentController } from '../controllers/comments/newCommentController.js'
import { Router } from 'express'
import { authUserController } from '../middlewares/authUserController.js'
import { deleteCommentsController } from '../controllers/comments/deleteCommentsController.js'
import { editCommentController } from '../controllers/comments/editCommentController.js'

const router = Router()
// Crear comentario

router.post('/posts/:postId/comments', authUserController, newCommentController)

// Crear respuesta de comentario

router.post('/posts/:postId/comments/:commentId', authUserController, newCommentController)

// Eliminar comentario

router.delete('/posts/:postId/comments/:commentId', authUserController, deleteCommentsController)

// Editar un comentario

router.put('/posts/:postId/comments/:commentId', authUserController, editCommentController)

export default router
