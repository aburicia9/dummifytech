// Importamos express y creamos un router.
import { Router } from 'express'
import { listPostsController } from '../controllers/posts/listsPostsController.js'
import { authUserController } from '../middlewares/authUserController.js'
import { newPostController } from '../controllers/posts/newPostController.js'
import { postAlreadyExistsController } from '../middlewares/postAlreadyExistsController.js'
import { newLikeController } from '../controllers/posts/newLikeController.js'
import { deleteLikeController } from '../controllers/posts/deleteLikeController.js'
import { deletePostController } from '../controllers/posts/deletePostController.js'
import { notRegisteredUserPostController } from '../controllers/posts/notRegisteredUserPostController.js'
import { newDislikeController } from '../controllers/posts/newDislikeController.js'
import { deleteDislikeController } from '../controllers/posts/deleteDislikeController.js'
const router = Router()

// Creamos la ruta. (endpoint)

// Visualizar post sin usuario registrado
router.get('/', notRegisteredUserPostController)

// Visualizar posts con usuario registrado
router.get('/posts', authUserController, listPostsController)

// creacion del post
router.post('/posts/insert', authUserController, newPostController)

// Eliminacion del post
router.delete('/posts/:postId', authUserController, postAlreadyExistsController, deletePostController)

// Dar like a una publicación
router.post('/posts/:postId/likes', authUserController, postAlreadyExistsController, newLikeController)

// Dar Dislike a una publicación
router.post('/posts/:postId/Dislikes', authUserController, postAlreadyExistsController, newDislikeController)

// Eliminar like de una publicación
router.delete('/posts/:postId/likes', authUserController, postAlreadyExistsController, deleteLikeController)
export default router

// Eliminar dislike de una publicación
router.delete('/posts/:postId/Dislikes', authUserController, postAlreadyExistsController, deleteDislikeController)
